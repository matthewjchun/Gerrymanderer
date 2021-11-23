import csv 
import json

def csvToJsonCounty(infilename):
    data = {}
    with open(infilename, "r") as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            key = row["COUNTY"]
            data[key] = row
    with open(infilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))

def csvToJsonState(infilename): 
    data = {}
    with open(infilename, "r") as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            key = row["NAME"]
            data[key] = row
    with open(infilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))

def csvToJsonPrecinct(infilename):
    data = []
    with open(infilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            dataDict = {"GEOID": row["GEOID20"], "County": row["COUNTYFP20"], 
                        "TotalPopulation": row["P0020001"], "Hispanic": row["P0020002"], 
                        "White": row["P0020005"], "AfricanAmerican": row["P0020006"],
                        "NativeAmerican": row["P0020007"], "Asian": row["P0020008"],
                        "PacificIslander": row["P0020009"]}
            data.append(dataDict)
    with open(infilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))
            
def csvToJsonPrecinctParty(infilename):
    data = []
    with open(infilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            if row["election"] == "Attorney General":
                dataDict = {"VTD20":row["VTDST20"], "Democrat": row["party_dem"], "Republican": row["party_rep"]}
                data.append(dataDict)
    with open(infilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))

def csvToJsonPrecinctIds(infilename):
    data = {}
    with open(infilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            data[row["precinct"]] = row["id"]
    with open(infilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))

def csvToJsonPrecinct(idFilename, dataFilename):
    data = {}
    dataList = []
    f = open(dataFilename, 'r')
    csvReader = csv.reader(f)
    header = next(csvReader)
    for row in csvReader:
        dataList.append(row)
    with open(idFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            for row2 in dataList:
                if row["precinct"] == row2[header.index("GEOID20")]:
                    data[row["id"]] = {"total": row2[header.index("P0020001")], "hispanic": row2[header.index("P0020002")], 
                                        "white": row2[header.index("P0020005")], "african": row2[header.index("P0020006")],
                                        "native": row2[header.index("P0020007")], "asian": row2[header.index("P0020008")], 
                                        "pacificIslander": row2[header.index("P0020009")]}
                    break;
    with open(idFilename[:-4]+".json", "w") as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))