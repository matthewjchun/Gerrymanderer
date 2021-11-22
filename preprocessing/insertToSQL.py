import csv 
import json
from cleanData import writeToCSVFile

def csvToSQLState(inFilename, outFilename):
    data = []
    populationData = []
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            if '+' in row["INTPTLAT20"]:
                row["INTPTLAT20"] = row["INTPTLAT20"][1:]
            if '+' in row["INTPTLON20"]:
                row["INTPTLON20"] = row["INTPTLON20"][1:]
            data.append({"name": row["STUSPS20"].lower(),"centerLat": row["INTPTLAT20"], "centerLon": row["INTPTLON20"], "path": "states/" + row["STUSPS20"].lower() + ".json"})
            populationData.append({"popType": 0, "total": row["P0020001"], "hispanic": row["P0020002"], "white": row["P0020005"], 
                                "african": row["P0020006"], "native": row["P0020007"], "asian": row["P0020008"], "pacificIslander": row["P0020009"]})
            populationData.append({"popType": 1, "total": row["P0040001"], "hispanic": row["P0040002"], "white": row["P0040005"], 
                                "african": row["P0040006"], "native": row["P0040007"], "asian": row["P0040008"], "pacificIslander": row["P0040009"]})
            populationData.append({"popType": 2, "total": row["CVAP_TOT19"], "hispanic": row["CVAP_HSP19"], "white": row["CVAP_WHT19"], "african": row["CVAP_BLK19"],
                                    "native": row["CVAP_AIA19"], "asian": row["CVAP_ASN19"], "pacificIslander": row["CVAP_NHP19"]})
    with open(outFilename + ".sql", 'w') as file:
        sqlStateInsert = "INSERT INTO States (name, centerLat, centerLon, path) VALUES "
        for row in data:
            sqlStateInsert +=  "('" + str(row["name"]) + "', " + str(row["centerLat"]) + ", " + str(row["centerLon"]) + ", '" + str(row["path"]) + "'),"
        file.write(sqlStateInsert[:-1] + ';')
    with open(outFilename + "_population.sql", 'w') as file:
        sqlPopulationInsert = "INSERT INTO Populations (popType, total, african, white, asian, hispanic, native, pacificIslander, stateName) VALUES"
        for row in populationData:
            sqlPopulationInsert += "(" + str(row["popType"]) + ", " + str(row["total"]) + ", " + str(row["african"]) + ", " + str(row["white"]) + ", " + str(row["asian"]) + ", " + str(row["hispanic"]) + ", " + str(row["native"]) +  ", " + str(row["pacificIslander"]) + ", '" + str(data[0]["name"]) + "'),"
        file.write(sqlPopulationInsert[:-1] + ';')

def csvToSQLCounty(inFilename, outFilename, state, id, index):
    data = []
    populationData = []
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            data.append({"id": str(id), "county": str(row["COUNTYFP20"]), "stateName": state, "path": "counties/" + state + "_county_" + str(index) + ".json"})
            populationData.append({"popType": 0, "total": row["P0020001"], "hispanic": row["P0020002"], "white": row["P0020005"], 
                                "african": row["P0020006"], "native": row["P0020007"], "asian": row["P0020008"], "pacificIslander": row["P0020009"], "id": str(id)})
            populationData.append({"popType": 1, "total": row["P0040001"], "hispanic": row["P0040002"], "white": row["P0040005"], 
                                "african": row["P0040006"], "native": row["P0040007"], "asian": row["P0040008"], "pacificIslander": row["P0040009"], "id": str(id)})
            populationData.append({"popType": 2, "total": row["CVAP_TOT19"], "hispanic": row["CVAP_HSP19"], "white": row["CVAP_WHT19"], "african": row["CVAP_BLK19"],
                                    "native": row["CVAP_AIA19"], "asian": row["CVAP_ASN19"], "pacificIslander": row["CVAP_NHP19"], "id": str(id)})
            index += 1
            id += 1
    with open(outFilename + ".sql", 'w') as file:
        sqlStateInsert = "INSERT INTO Counties (id, stateName, path) VALUES \n"
        for row in data:
            sqlStateInsert +=  "(" + str(row["id"]) + ", '" + str(row["stateName"]) + "',  '" + str(row["path"]) + "'),\n"
        file.write(sqlStateInsert[:-2] + ';')
    with open(outFilename + "_population.sql", 'w') as file:
        sqlPopulationInsert = "INSERT INTO Populations (popType, total, african, white, asian, hispanic, native, pacificIslander, countyId) VALUES\n"
        for row in populationData:
            sqlPopulationInsert += "(" + str(row["popType"]) + ", " + str(row["total"]) + ", " + str(row["african"]) + ", " + str(row["white"]) + ", " + str(row["asian"]) + ", " + str(row["hispanic"]) + ", " + str(row["native"]) +  ", " + str(row["pacificIslander"]) + ", '" + str(row["id"]) + "'),\n"
        file.write(sqlPopulationInsert[:-2] + ';')
    newData = []
    header = ["id", "county"]
    for row in data:
        newData.append([row["id"], row["county"]])
    writeToCSVFile(state + "_county_id.csv", header, newData)

def districtingSQLInsert(outFilename, id, stateName):
    with open(outFilename + ".sql", 'w') as file:
        sqlDistrictingInsert = "INSERT INTO Districtings (id, stateName, districtPath, countyPath, precinctPath) VALUES (" + str(id) + ", '" + stateName + "', " + "'districts/" + stateName + "_districts.json', 'counties/" + stateName + "_counties.json', 'precincts/" + stateName + "_precincts.json');"
        file.write(sqlDistrictingInsert)

def csvToSQLDistrict(inFilename, outFilename, state, id, index, districtingId):
    data = []
    populationData = []
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            data.append({"id": str(id), "GEOID20": row["GEOID20"] ,"districtingId": str(districtingId), "path": "enacted/districts/" + state + "_district_" + str(index) + ".json"})
            populationData.append({"popType": 0, "total": row["P0020001"], "hispanic": row["P0020002"], "white": row["P0020005"], 
                                "african": row["P0020006"], "native": row["P0020007"], "asian": row["P0020008"], "pacificIslander": row["P0020009"], "id": id})
            populationData.append({"popType": 1, "total": row["P0040001"], "hispanic": row["P0040002"], "white": row["P0040005"], 
                                "african": row["P0040006"], "native": row["P0040007"], "asian": row["P0040008"], "pacificIslander": row["P0040009"], "id": id})
            populationData.append({"popType": 2, "total": row["CVAP_TOT19"], "hispanic": row["CVAP_HSP19"], "white": row["CVAP_WHT19"], "african": row["CVAP_BLK19"],
                                    "native": row["CVAP_AIA19"], "asian": row["CVAP_ASN19"], "pacificIslander": row["CVAP_NHP19"], "id": id})
            index += 1
            id += 1
    with open(outFilename + ".sql", 'w') as file:
        sqlStateInsert = "INSERT INTO Districts (id, polsbyPopper, majorMinority, path, districtingId) VALUES \n"
        for row in data:
            sqlStateInsert +=  "(" + str(row["id"]) + ", " + '0' + ", " + '0' + ", '" + str(row["path"]) + "', " + str(row["districtingId"]) + "),\n"
        file.write(sqlStateInsert[:-2] + ';')
    with open(outFilename + "_population.sql", 'w') as file:
        sqlPopulationInsert = "INSERT INTO Populations (popType, total, african, white, asian, hispanic, native, pacificIslander, districtId) VALUES \n"
        for row in populationData:
            sqlPopulationInsert += "(" + str(row["popType"]) + ", " + str(row["total"]) + ", " + str(row["african"]) + ", " + str(row["white"]) + ", " + str(row["asian"]) + ", " + str(row["hispanic"]) + ", " + str(row["native"]) +  ", " + str(row["pacificIslander"]) + ", " + str(row["id"]) + "),\n"
        file.write(sqlPopulationInsert[:-2] + ';')
    header = ["id", "GEOID20"]
    newData = []
    for row in data:
        newData.append([row["id"], row["GEOID20"]])
    writeToCSVFile(state + "_district_id.csv", header, newData)

def csvToSQLPrecinct(inFilename, outFilename, state, id, index, districtFile, countyFile):
    data = []
    populationData = []
    districtData = []
    countyData = []
    with open(countyFile, 'r') as csvfile:
        csvReader = csv.reader(csvfile)
        for row in csvReader:
            countyData.append(row)
    with open(districtFile, 'r') as csvfile:
        csvReader = csv.reader(csvfile)
        for row in csvReader:
            districtData.append(row)
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            rowDict = {"id": str(id), "GEOID20": row["GEOID20"], "path": "precincts/" + state + "_precincts_" + str(index) + ".json"}
            for line in districtData:
                if line[1][2:] == row["CD116"]:
                    rowDict["districtId"] = line[0]
            for line in countyData:
                if line[1] == row["COUNTYFP20"]:
                    rowDict["countyId"] = line[0]
            data.append(rowDict)
            populationData.append({"popType": 0, "total": row["P0020001"], "hispanic": row["P0020002"], "white": row["P0020005"], 
                                "african": row["P0020006"], "native": row["P0020007"], "asian": row["P0020008"], "pacificIslander": row["P0020009"], "id": id})
            populationData.append({"popType": 1, "total": row["P0040001"], "hispanic": row["P0040002"], "white": row["P0040005"], 
                                "african": row["P0040006"], "native": row["P0040007"], "asian": row["P0040008"], "pacificIslander": row["P0040009"], "id": id})
            populationData.append({"popType": 2, "total": row["CVAP_TOT19"], "hispanic": row["CVAP_HSP19"], "white": row["CVAP_WHT19"], "african": row["CVAP_BLK19"],
                                    "native": row["CVAP_AIA19"], "asian": row["CVAP_ASN19"], "pacificIslander": row["CVAP_NHP19"], "id": id})
            index += 1
            id += 1
    with open(outFilename + ".sql", 'w') as file:
        sqlStateInsert = "INSERT INTO Precincts (id, path, districtId, countyId) VALUES \n"
        for row in data:
            sqlStateInsert +=  "('" + str(row["id"]) + "', '" + str(row["path"]) + "', " + str(row["districtId"]) + ", " + str(row["countyId"]) +"),\n"
        file.write(sqlStateInsert[:-2] + ';')
    with open(outFilename + "_population.sql", 'w') as file:
        sqlPopulationInsert = "INSERT INTO Populations (popType, total, african, white, asian, hispanic, native, pacificIslander, precinctId) VALUES \n"
        for row in populationData:
            sqlPopulationInsert += "(" + str(row["popType"]) + ", " + str(row["total"]) + ", " + str(row["african"]) + ", " + str(row["white"]) + ", " + str(row["asian"]) + ", " + str(row["hispanic"]) + ", " + str(row["native"]) +  ", " + str(row["pacificIslander"]) + ", " + str(row["id"]) + "),\n"
        file.write(sqlPopulationInsert[:-2] + ';')
    header = ["id", "precinct"]
    newData = []
    for row in data:
        newData.append([row["id"], row["GEOID20"]])
    writeToCSVFile(state + "_precinct_id.csv", header, newData)

def csvToSQLCB(inFilename, outFilename, state, id, index, districtFile, precinctFile):
    data = []
    populationData = []
    districtData = []
    precinctData = []
    with open(precinctFile, 'r') as csvfile:
        csvReader = csv.reader(csvfile)
        for row in csvReader:
            precinctData.append(row)
    with open(districtFile, 'r') as csvfile:
        csvReader = csv.reader(csvfile)
        for row in csvReader:
            districtData.append(row)
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            rowDict = {"id": str(id), "GEOID20": row["GEOID20"], "path": "districts/" + state + "_censusblock_" + str(index) + ".json"}
            for line in districtData:
                if line[1][2:] == row["CD116"]:
                    rowDict["districtId"] = line[0]
            for line in precinctData:
                if line[1] == row["STATEFP20"]+row["COUNTYFP20"]+row["VTD"]:
                    rowDict["precinctId"] = line[0]
            data.append(rowDict)
            populationData.append({"popType": 0, "total": row["P0020001"], "hispanic": row["P0020002"], "white": row["P0020005"], 
                                "african": row["P0020006"], "native": row["P0020007"], "asian": row["P0020008"], "pacificIslander": row["P0020009"], "id": id})
            populationData.append({"popType": 1, "total": row["P0040001"], "hispanic": row["P0040002"], "white": row["P0040005"], 
                                "african": row["P0040006"], "native": row["P0040007"], "asian": row["P0040008"], "pacificIslander": row["P0040009"], "id": id})
            populationData.append({"popType": 2, "total": row["CVAP_TOT19"], "hispanic": row["CVAP_HSP19"], "white": row["CVAP_WHT19"], "african": row["CVAP_BLK19"],
                                    "native": row["CVAP_AIA19"], "asian": row["CVAP_ASN19"], "pacificIslander": row["CVAP_NHP19"], "id": id})
            index += 1
            id += 1
    with open(outFilename + ".sql", 'w') as file:
        sqlStateInsert = "INSERT INTO CensusBlocks (id, path, districtId, precinctId) VALUES \n"
        for row in data:
            sqlStateInsert +=  "('" + str(row["id"]) + "', '" + str(row["path"]) + "', " + str(row["districtId"]) + ", " + str(row["precinctId"]) +"),\n"
        file.write(sqlStateInsert[:-2] + ';')
    with open(outFilename + "_population.sql", 'w') as file:
        sqlPopulationInsert = "INSERT INTO Populations (popType, total, african, white, asian, hispanic, native, pacificIslander, censusBlockId) VALUES\n"
        for row in populationData:
            sqlPopulationInsert += "(" + str(row["popType"]) + ", " + str(row["total"]) + ", " + str(row["african"]) + ", " + str(row["white"]) + ", " + str(row["asian"]) + ", " + str(row["hispanic"]) + ", " + str(row["native"]) +  ", " + str(row["pacificIslander"]) + ", " + str(row["id"]) + "),\n"
        file.write(sqlPopulationInsert[:-2] + ';')
    header = ["id", "cb"]
    newData = []
    for row in data:
        newData.append([row["id"], row["GEOID20"]])
    writeToCSVFile(state + "_CB_id.csv", header, newData)

if __name__=="__main__":
    # csvToSQLState("az_state.csv", "az_state")
    # districtingSQLInsert("az_districting", 1, "az")
    # csvToSQLCounty("az_county.csv", "az_county", "az", 1, 0)
    # csvToSQLDistrict("az_district.csv", "az_district", "az", 1, 0, 1)
    # csvToSQLPrecinct("az_precinct.csv", "az_precinct", "az", 1, 0, "az_district_id.csv", "az_county_id.csv")
    # csvToSQLCB("az_cb.csv", "az_cb", "az", 1, 0, "az_district_id.csv", "az_precinct_id.csv")
