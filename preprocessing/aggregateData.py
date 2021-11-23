import csv
from getData import writeToCSVFile

def aggregatePrecinctPartyToCounty(precinctFile, countyFile, outFilename):
    f1 = open(countyFile)
    f2 = open(precinctFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header = []
    header1 = next(csvReader1)
    for h in header1:
        header.append(h)
    header.append("party_dem")
    header.append("party_rep")
    newData = []
    with open(countyFile, "r") as f1:
        csvReader1 = csv.DictReader(f1)
        for row1 in csvReader1:
            currentGEOID = row1["COUNTY"]
            with open (precinctFile, "r") as f2:
                csvReader2 = csv.DictReader(f2)
                partyList = [0, 0]
                for row2 in csvReader2:
                    precinctGEOID = row2["COUNTYFP"]
                    if precinctGEOID == currentGEOID:
                        partyList[0] += int(row2["party_dem"])
                        partyList[1] += int(row2["party_rep"])
            rowList = []
            for h in header1:
                rowList.append(row1[h])
            newData.append(rowList + partyList)
    writeToCSVFile(outFilename, header, newData)

def aggregatePrecinctPartyToDistrict(precinctFile, districtFile, outFilename):
    f1 = open(districtFile)
    f2 = open(precinctFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header = [] 
    header1 = next(csvReader1)
    for h in header1:
        header.append(h)
    header.append("party_dem")
    header.append("party_rep")
    newData = []
    oldGEOID = 0
    with open(districtFile, "r") as f1:
        csvReader1 = csv.DictReader(f1)
        for row1 in csvReader1:
            currentGEOID = Decimal(row1["GEOID20"])
            with open (precinctFile, "r") as f2:
                csvReader2 = csv.DictReader(f2)
                partyList = [0, 0]
                for row2 in csvReader2:
                    precinctGEOID = Decimal(row2["GEOID20"][:4])
                    if precinctGEOID < currentGEOID and precinctGEOID >= oldGEOID:
                        partyList[0] += int(row2["party_dem"])
                        partyList[1] += int(row2["party_rep"])
            oldGEOID = Decimal(row1["GEOID20"])
            rowList = []
            for h in header1:
                rowList.append(row1[h])
            newData.append(rowList + partyList)
    writeToCSVFile(outFilename, header, newData)

def aggregateCountyPartyToState(countyFile, stateFile, outFilename):
    f1 = open(stateFile)
    f2 = open(countyFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header = [] 
    header1 = next(csvReader1)
    for h in header1:
        header.append(h)
    header.append("party_dem")
    header.append("party_rep")
    newData = []
    with open(stateFile, "r") as f1:
        csvReader1 = csv.DictReader(f1)
        for row1 in csvReader1:
            with open (countyFile, "r") as f2:
                csvReader2 = csv.DictReader(f2)
                partyList = [0, 0]
                for row2 in csvReader2:
                    partyList[0] += int(row2["party_dem"])
                    partyList[1] += int(row2["party_rep"])
            rowList = []
            for h in header1:
                rowList.append(row1[h])
            newData.append(rowList + partyList)
    writeToCSVFile(outFilename, header, newData)

def aggregateCVAPToPrecinct(CBFile, precinctFile, outFilename):
    f1 = open(CBFile)
    f2 = open(precinctFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header2 + ["CVAP_TOT19","CVAP_HSP19","CVAP_WHT19","CVAP_BLK19","CVAP_AIA19","CVAP_ASN19","CVAP_NHP19", "CD116"]
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    for row2 in fileList2: 
        cVAPData = [0, 0, 0, 0, 0, 0, 0]
        district = {}
        for row1 in fileList1:
            if row2[header2.index("GEOID20")] == row1[header1.index("STATEFP20")]+row1[header1.index("COUNTYFP20")]+row1[header1.index("VTD")]:
                cVAPData[0] += round(float(row1[header1.index("CVAP_TOT19")]))
                cVAPData[1] += round(float(row1[header1.index("CVAP_HSP19")]))
                cVAPData[2] += round(float(row1[header1.index("CVAP_WHT19")]))
                cVAPData[3] += round(float(row1[header1.index("CVAP_BLK19")]))
                cVAPData[4] += round(float(row1[header1.index("CVAP_AIA19")]))
                cVAPData[5] += round(float(row1[header1.index("CVAP_ASN19")]))
                cVAPData[6] += round(float(row1[header1.index("CVAP_NHP19")]))
                if row1[header1.index("CD116")] not in district:
                    district[row1[header1.index("CD116")]] = 1
                else:
                    district[row1[header1.index("CD116")]] += 1
        cd = max(district, key=lambda x: district[x])        
        newData.append(row2 + cVAPData + [cd])
    writeToCSVFile(outFilename, header, newData)

def aggregateCVAPToDistrict(CBFile, districtFile, outFilename):
    f1 = open(CBFile)
    f2 = open(districtFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header2 + ["CVAP_TOT19","CVAP_HSP19","CVAP_WHT19","CVAP_BLK19","CVAP_AIA19","CVAP_ASN19","CVAP_NHP19"]
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    for row2 in fileList2: 
        cVAPData = [0, 0, 0, 0, 0, 0, 0]
        for row1 in fileList1:
            if row2[header2.index("CD116FP")] == row1[header1.index("CD116")]:
                cVAPData[0] += round(float(row1[header1.index("CVAP_TOT19")]))
                cVAPData[1] += round(float(row1[header1.index("CVAP_HSP19")]))
                cVAPData[2] += round(float(row1[header1.index("CVAP_WHT19")]))
                cVAPData[3] += round(float(row1[header1.index("CVAP_BLK19")]))
                cVAPData[4] += round(float(row1[header1.index("CVAP_AIA19")]))
                cVAPData[5] += round(float(row1[header1.index("CVAP_ASN19")]))
                cVAPData[6] += round(float(row1[header1.index("CVAP_NHP19")]))
        newData.append(row2 + cVAPData)
    writeToCSVFile(outFilename, header, newData)

def aggregateCVAPToCounty(CBFile, countyFile, outFilename):
    f1 = open(CBFile)
    f2 = open(countyFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header2 + ["CVAP_TOT19","CVAP_HSP19","CVAP_WHT19","CVAP_BLK19","CVAP_AIA19","CVAP_ASN19","CVAP_NHP19"]
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    for row2 in fileList2: 
        cVAPData = [0, 0, 0, 0, 0, 0, 0]
        for row1 in fileList1:
            if row2[header2.index("COUNTYFP20")] == row1[header1.index("COUNTYFP20")]:
                cVAPData[0] += round(float(row1[header1.index("CVAP_TOT19")]))
                cVAPData[1] += round(float(row1[header1.index("CVAP_HSP19")]))
                cVAPData[2] += round(float(row1[header1.index("CVAP_WHT19")]))
                cVAPData[3] += round(float(row1[header1.index("CVAP_BLK19")]))
                cVAPData[4] += round(float(row1[header1.index("CVAP_AIA19")]))
                cVAPData[5] += round(float(row1[header1.index("CVAP_ASN19")]))
                cVAPData[6] += round(float(row1[header1.index("CVAP_NHP19")]))
        newData.append(row2 + cVAPData)
    writeToCSVFile(outFilename, header, newData)

def aggregateCVAPToState(CBFile, stateFile, outFilename):
    f1 = open(CBFile)
    f2 = open(stateFile)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header2 + ["CVAP_TOT19","CVAP_HSP19","CVAP_WHT19","CVAP_BLK19","CVAP_AIA19","CVAP_ASN19","CVAP_NHP19"]
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    cVAPData = [0, 0, 0, 0, 0, 0, 0]    
    for row1 in fileList1:
        cVAPData[0] += round(float(row1[header1.index("CVAP_TOT19")]))
        cVAPData[1] += round(float(row1[header1.index("CVAP_HSP19")]))
        cVAPData[2] += round(float(row1[header1.index("CVAP_WHT19")]))
        cVAPData[3] += round(float(row1[header1.index("CVAP_BLK19")]))
        cVAPData[4] += round(float(row1[header1.index("CVAP_AIA19")]))
        cVAPData[5] += round(float(row1[header1.index("CVAP_ASN19")]))
        cVAPData[6] += round(float(row1[header1.index("CVAP_NHP19")]))
    newData.append(row2 + cVAPData)
    writeToCSVFile(outFilename, header, newData)

if __name__ == "__main__":
