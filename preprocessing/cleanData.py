import ijson
import csv
import json

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

def writeToCSVFile(filename, header, data):
    with open(filename.lower(), 'w', newline='') as csvfile:
        csvWriter = csv.writer(csvfile)
        csvWriter.writerow(header)
        csvWriter.writerows(data)

if __name__=="__main__":
    relative_path = "../server/rest-gerrymandering/src/main/resources/data/"
    createGeoJson("dataSource/az_county.json", "AZ", "County", relative_path + "counties/")
    createGeoJson("dataSource/az_district.json", "AZ", "District", relative_path + "districts/enacted/")
    createGeoJson("dataSource/az_precinct.json", "AZ", "Precinct", relative_path + "precincts/")
    # createGeoJson("datasource/AZ_CensusBlock.json", "AZ", "CensusBlock", relative_path + "censusblocks/")