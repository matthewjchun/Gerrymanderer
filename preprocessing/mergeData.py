import csv
from getData import writeToCSVFile

def mergePrecinctByName(file1, file2, outFilename):
    f1 = open(file1)
    f2 = open(file2)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header1 + header2
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    nameIndex1 = header1.index("precinct")
    nameIndex2 = header2.index("precinct")
    for row1 in fileList1:
        rowList = []
        for row2 in fileList2:
            if nameIsEqual(row1[nameIndex1], row2[nameIndex2]):
                rowList = row1 + row2
                break
        newData.append(rowList)
    writeToCSVFile(outFilename, header, newData)

def nameIsEqual(name1, name2):
    name2 = name2.replace('.', '')
    name2 = name2.replace('-', ' ')
    name1 = name1.replace('-', ' ')
    nameList = name1.split(" ")
    if name1.casefold() == name2.casefold():
        return True
    elif len(nameList) >= 2:
        if " ".join(nameList[1:]).casefold() == name2.casefold():
            return True
        if " ".join(nameList[:-1]).casefold() == name2.casefold():
            return True
        if " ".join(nameList[:-2]).casefold() == name2.casefold():
            return True
        if nameList[0].casefold() == name2.casefold():
            return True

def mergePrecinctByGeoID(file1, file2, outFilename):
    f1 = open(file1)
    f2 = open(file2)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header1 + header2
    newData = []
    fileList1 = []
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    GEOIDIndex1 = header1.index("GEOID20")
    GEOIDIndex2 = header2.index("GEOID")
    for row1 in fileList1:
        rowList = []
        for row2 in fileList2:
            if row1[GEOIDIndex1] == row2[GEOIDIndex2]:
                rowList = row1 + row2
        newData.append(rowList)
    writeToCSVFile(outFilename, header, newData)

def mergeCensusBlocks(file1, file2, outFilename):
    f1 = open(file1)
    f2 = open(file2)
    csvReader1 = csv.reader(f1)
    csvReader2 = csv.reader(f2)
    header1 = next(csvReader1)
    header2 = next(csvReader2)
    header = header1 + header2
    newData = []
    fileList1 = [] 
    fileList2 = []
    for row1 in csvReader1:
        fileList1.append(row1)
    for row2 in csvReader2:
        fileList2.append(row2)
    for row1 in fileList1:
        for row2 in fileList2: 
            if row1[header1.index("GEOID20")] == row2[header2.index("GEOID20")]:
                rowList = []
                for i in row1:
                    rowList.append(i)
                for i in row2:
                    rowList.append(i)
                newData.append(rowList)
                fileList2.remove(row2)
    writeToCSVFile(outFilename, header, newData)

if __name__ == "__main__":
    mergePrecinctByGeoID()
    mergePrecinctByName()
    mergeCensusBlocks()