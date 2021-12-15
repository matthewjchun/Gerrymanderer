import ijson
import csv
import json
from os import listdir
from os.path import isfile, join
from util import writeToCSVFile, calculateAvgPolsbyPopper, calculatePolsbyPopper, getPopulationEquality
from shapely.geometry import Polygon, MultiPoint

def createGeoJson(inFilename, state, level, folder):
    f = open(inFilename)
    data = ijson.items(f, 'features.item', use_float=True)
    index = 0
    for polygon in data:
        json_data = polygon["geometry"]
        with open((folder + str(state) + "_" + str(level) +"_" + str(index) + ".json").lower(), 'w') as outfile:
            if level == "State":
                outfile.write(json.dumps({"type": "Feature", "geometry": json_data, "properties":{"GEOID20": polygon["properties"]["STATEFP20"]}}))
            elif level == "CensusBlock":
                outfile.write(json.dumps({"type": "Feature", "geometry": json_data, "properties":{"GEOID20": polygon["properties"]["STATEFP20"]+polygon["properties"]["COUNTYFP20"]+polygon["properties"]["VTD"], "CD116": polygon["properties"]["CD116"]}}))
            else:
                outfile.write(json.dumps({"type": "Feature", "geometry": json_data, "properties":{"GEOID20": polygon["properties"]["GEOID20"]}}))
        index+=1

def createPropertyCSV(inFilename, state, level):
    f = open(inFilename)
    data = ijson.items(f, 'features.item', use_float=True)
    newData = []
    header = []
    index = 0
    for property in data:
        rowValue = []
        for key in property['properties']:
            if index == 0:
                header.append(key)
            rowValue.append(property['properties'][key])
        newData.append(rowValue)
        index += 1
    filename = (str(state) + "_" + str(level) + ".csv").lower()
    writeToCSVFile(filename, header, newData)

def getGeneralElectionVTDCSV(inFilename, outFilename):
    header = ["state", "district", "county", "precinct", "party_dem", "party_rep", "year", "election"]
    newData = []
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            if row["office"] == "State Senate" or row["office"] == "Attorney General":
                isNewData = True
                for row2 in newData:
                    if row["office"] in row2 and row["precinct"] in row2:
                        if row["party"] == "democrat":
                            row2[header.index("party_dem")] = row["votes"]
                            isNewData = False
                        if row["party"] == "republican": 
                            row2[header.index("party_rep")] = row["votes"]
                            isNewData = False
                if isNewData:
                    if row["party"] == "democrat":
                        newData.append([row["state"],row["district"], row["county"], row["precinct"], row["votes"], 0, row["year"], row["office"]])
                    if row["party"] == "republican": 
                        newData.append([row["state"],row["district"], row["county"], row["precinct"], 0, row["votes"], row["year"], row["office"]])
    writeToCSVFile(outFilename, header, newData)

def getCountyGEOID(inFilename, outFilename):
    newData = []
    header = ["NAME", "COUNTY", "GEOID20"]
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            newData.append([row["NAME20"], row["COUNTYFP20"], row["GEOID20"]])
    writeToCSVFile(outFilename, header, newData)

def getPrecinctGEOID(inFilename, outFilename):
    newData = []
    header = ["GEOID20", "VTDST20", "precinct"]
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            newData.append([row["GEOID20"], row["VTDST20"], row["NAME20"]])
    writeToCSVFile(outFilename, header, newData)

def createDistricting(districtGeoJsonDir, districtFile, id, state):
    header = ["id", "peTotal", "peVAP", "peCVAP", "avgPolsby", "mmTotal", "mmVAP", "mmCVAP", "stateName",
                "districtPath", "countyPath", "precinctPath"]
    newData = [[str(id)] + getPopulationEquality(districtFile) + [str(calculateAvgPolsbyPopper(districtGeoJsonDir)), 
                '0', '0', '0', state, "districts/" + state + "_districts.json", "counties/" + state + "_counties.json", 
                "precincts/" + state + "_precincts.json"]]
    writeToCSVFile(state + "_districting_" + str(id) + ".csv", header, newData)

def addDistrictMeasures(inFilename, districtGeoJsonDir, outFilename):
    files = [f for f in listdir(districtGeoJsonDir) if isfile(join(districtGeoJsonDir, f))]
    polsbyPopperList = []
    for file in files:
        value = calculatePolsbyPopper(join(districtGeoJsonDir,file))
        polsbyPopperList.append(value)
    f = open(inFilename, 'r')
    csvReader = csv.reader(f)
    header = next(csvReader) + ["polsbyPopper", "mmTotal", "mmVAP", "mmCVAP"]
    newData = []
    index = 0
    for row in csvReader:
        newData.append(row + [polsbyPopperList[index], '0', '0', '0'])
        index += 1
    writeToCSVFile(outFilename, header, newData)

def getAGElectionState(electionFile, outFilename, state):
    with open(electionFile, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        republicanVotes = 0
        democraticVotes = 0
        for row in csvReader:
            if row["election"] == "Attorney General":
                republicanVotes += int(row["party_rep"])
                democraticVotes += int(row["party_dem"])
        header = ["state", "election", "democratic", "republican"]
        newData = [[state, "ag", str(democraticVotes), str(republicanVotes)]]
        writeToCSVFile(outFilename, header, newData)

def getAGElectionDistrict(electionFile, precinctFile, districtFile, outFilename):
    f = open(districtFile, 'r')
    csvReader = csv.DictReader(f)
    districtDict = {}
    for row in csvReader:
        districtDict[row['CD116FP']] = {"party_dem": 0, "party_rep": 0}
    print(districtDict["01"]["party_dem"])
    with open(precinctFile, 'r') as precinctCSV:
        csvReader1 = csv.DictReader(precinctCSV)
        for row1 in csvReader1:
            with open(electionFile, 'r') as electionCSV:
                csvReader2 = csv.DictReader(electionCSV)
                for row2 in csvReader2:
                    if row2["election"] == "Attorney General" and row1["GEOID20"]==row2["GEOID20"]:
                        districtDict[row1["CD116"]]["party_dem"] += int(row2["party_dem"])
                        districtDict[row1["CD116"]]["party_rep"] += int(row2["party_rep"])
    header = ["CD116", "democratic", "republican"]
    newData = []
    for key in districtDict.keys():
        newData.append([key, str(districtDict[key]["party_dem"]), str(districtDict[key]["party_rep"])])
    writeToCSVFile(outFilename, header, newData)

def getNeighbors(neighborFile, isPrecinct):
    if isPrecinct == 0:
        distance = 60.96
    else:
        distance = 30.48 
    f = open(neighborFile)
    data = ijson.items(f, 'nodes.item', use_float=True)
    nodeData = {}
    neighborData = []
    for row in data:
        nodeData[row["id"]] = row["GEOID20"]
    f = open(neighborFile)
    data = ijson.items(f, 'adjacency.item', use_float=True)
    index = 0
    for row in data:
        row_neighbors = []
        for neighbor in row:
            if neighbor["shared_perim"] <= distance:
                row_neighbors.append(nodeData[neighbor["id"]])
        if row_neighbors != []:
            neighborData.append([nodeData[index]] + row_neighbors)
        index +=1
    writeToCSVFile("va_cb_neighbors.csv", [], neighborData)

def getBorder(cdDir, precinctDir):
    files = [f for f in listdir(cdDir) if isfile(join(cdDir, f))]
    cdData = []
    for file in files:
        f = open(join(cdDir,file), 'r')
        data = json.load(f)
        cdData.append({"GEOID20":data["properties"]["GEOID20"], "STATE":data["properties"]["STATEFP20"], "COUNTY": data["properties"]["COUNTYFP20"], "VTD": data["properties"]["VTD"], "CD116": data["properties"]["CD116"], "POLYGON":data["geometry"]["coordinates"]})
    files = [f for f in listdir(precinctDir) if isfile(join(precinctDir, f))]
    borderData = []
    for file in files:
        with open(join(precinctDir,file), 'r') as precinctFile:
            data = json.load(precinctFile)
            precinctGEOID = data["properties"]["GEOID20"]
            border = [precinctGEOID]
            count = 0
            if data["geometry"]["type"] == "MultiPolygon":
                for poly in data["geometry"]["coordinates"]:
                    precinctPolygon = Polygon(poly[0])
                    for row in cdData:
                        cdPolygon = Polygon(row["POLYGON"][0])
                        cdVTD = row["STATE"] + row["CD116"]
                        if cdPolygon.intersects(precinctPolygon) and cdVTD == precinctGEOID:
                            border.append(row["GEOID20"])
                            cdData.remove(row)
                            count += 1
            else:
                precinctPolygon = Polygon(data["geometry"]["coordinates"][0])
                for row in cdData:
                    cdPolygon = Polygon(row["POLYGON"][0])
                    cdVTD = row["STATE"] + row["COUNTY"] + row["VTD"]
                    if cdPolygon.intersects(precinctPolygon) and cdVTD == precinctGEOID:
                        border.append(row["GEOID20"])
                        cdData.remove(row)
                        count += 1
            borderData.append(border)
            print(str(join(precinctDir,file)) + "; Count: " + str(count))
    writeToCSVFile("mi_district_cb_borders.csv", ["precinct", "cb"], borderData)


if __name__=="__main__":
    relative_path = "../server/rest-gerrymandering/src/main/resources/data/"
    # AZ
    # createGeoJson("dataSource/az_county.json", "AZ", "County", relative_path + "counties/")
    # createGeoJson("dataSource/az_district.json", "AZ", "District", relative_path + "districts/enacted/")
    # createGeoJson("dataSource/az_precinct.json", "AZ", "Precinct", relative_path + "precincts/")
    # createGeoJson("dataSource/az_censusblock.json", "AZ", "CensusBlock", relative_path + "censusblocks/")
    # createPropertyCSV("dataSource/az_censusblock.json", "AZ", "CensusBlock")
    # createPropertyCSV("dataSource/az_precinct.json", "AZ", "Precinct")
    # createPropertyCSV("dataSource/az_district.json", "AZ", "District")
    # createPropertyCSV("dataSource/az_county.json", "AZ", "County")
    # MI
    # createGeoJson("dataSource/mi_pl2020_cnty.json", "MI", "County", relative_path + "counties/")
    # createGeoJson("dataSource/mi_pl2020_cd.json", "MI", "District", relative_path + "districts/enacted/")
    # createGeoJson("dataSource/mi_pl2020_vtd.json", "MI", "Precinct", relative_path + "precincts/")
    createGeoJson("dataSource/mi_cb.json", "MI", "CensusBlock", relative_path + "censusblocks/")
    # VA
    createGeoJson("dataSource/va_pl2020_cnty.json", "va", "County", relative_path + "counties/")
    createGeoJson("dataSource/va_pl2020_cd.json", "va", "District", relative_path + "districts/enacted/")
    createGeoJson("dataSource/va_pl2020_vtd.json", "va", "Precinct", relative_path + "precincts/")
    createGeoJson("dataSource/va_pl2020_b.json", "va", "CensusBlock", relative_path + "censusblocks/")