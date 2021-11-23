import csv 
import json 
import math
from os import listdir
from os.path import isfile, join
from shapely.geometry import Polygon

def writeToCSVFile(filename, header, data):
    with open(filename.lower(), 'w', newline='') as csvfile:
        csvWriter = csv.writer(csvfile)
        csvWriter.writerow(header)
        csvWriter.writerows(data)

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

def calculatePolsbyPopper(districtFile): 
    with open(districtFile, 'r') as jsonfile:
        data = json.load(jsonfile)
        polygon = Polygon(data["geometry"]["coordinates"][0])
        polygonLength = polygon.length
        poylgonArea = polygon.area
        return math.pi*4*poylgonArea/math.pow(polygonLength,2)

def calculateAvgPolsbyPopper(districtGeoJsonDir):
    files = [f for f in listdir(districtGeoJsonDir) if isfile(join(districtGeoJsonDir, f))]
    polsbyPopperList = []
    sumPolsbyPopper = 0
    for file in files:
        value = calculatePolsbyPopper(join(districtGeoJsonDir,file))
        sumPolsbyPopper += value
        polsbyPopperList.append(value)
    polsbyPopperList.sort()
    return (polsbyPopperList[-1] - polsbyPopperList[0])/sumPolsbyPopper

def getPopulationEquality(inFilename):
    popHeader = ["P0020001", "P0040001", "CVAP_TOT19"]
    newData = []
    with open(inFilename, 'r') as csvfile:
        csvReader = csv.DictReader(csvfile)
        totalPop = []
        vapPop = []
        cvapPop = []
        for row in csvReader:
            totalPop.append(row[popHeader[0]])
            vapPop.append(row[popHeader[1]])
            cvapPop.append(row[popHeader[2]])
        newData.append(str(calculatePopulationEquality(totalPop)))
        newData.append(str(calculatePopulationEquality(vapPop)))
        newData.append(str(calculatePopulationEquality(cvapPop)))
    return newData

def calculatePopulationEquality(popList):
    popList.sort()
    sumPop = 0
    for population in popList:
        sumPop += int(population)
    return (float(popList[-1]) - float(popList[0]))/sumPop