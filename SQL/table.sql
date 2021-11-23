USE Celtics;

CREATE TABLE IF NOT EXISTS States (
    name VARCHAR(2) NOT NULL,
    centerLat FLOAT, 
    centerLon FLOAT,
    path TEXT,
    PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS Districtings (
    id INT NOT NULL AUTO_INCREMENT,
    populationEqualityTotal DOUBLE,
    populationEqualityVAP DOUBLE,
    populationEqualityCVAP DOUBLE,
    avgPolsbyPopper DOUBLE,
    majorityMinorityCountTotal INT,
    majorityMinorityCountVAP INT,
    majorityMinorityCountCVAP INT,
    stateName VARCHAR(2),
    districtPath TEXT,
    countyPath TEXT,
    precinctPath TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (stateName) REFERENCES States(name)
);

CREATE TABLE IF NOT EXISTS Districts (
    id INT NOT NULL AUTO_INCREMENT,
    polsbyPopper DOUBLE,
    majorityMinorityTotal BOOLEAN,
    majorityMinorityVAP BOOLEAN,
    majorityMinorityCVAP BOOLEAN,
    path TEXT,
    districtingId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (districtingId) REFERENCES Districtings(id)
);

CREATE TABLE IF NOT EXISTS Counties (
    id INT NOT NULL AUTO_INCREMENT,
    path TEXT,
    stateName VARCHAR(2),
    PRIMARY KEY (id),
    FOREIGN KEY (stateName) REFERENCES States(name)
);

CREATE TABLE IF NOT EXISTS Precincts (
    id INT NOT NULL AUTO_INCREMENT,
    path TEXT,
    districtId INT,
    countyId INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (districtId) REFERENCES Districts(id),
    FOREIGN KEY (countyId) REFERENCES Counties(id)
);

CREATE TABLE IF NOT EXISTS CensusBlocks (
    id INT NOT NULL AUTO_INCREMENT,
    path TEXT,
    isBorder BOOLEAN,
    districtId INT,
    precinctId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (districtId) REFERENCES Districts(id),
    FOREIGN KEY (precinctId) REFERENCES Precincts(id)
);

CREATE TABLE IF NOT EXISTS Populations (
    id INT NOT NULL AUTO_INCREMENT, 
    popType INT NOT NULL,
    total INT, 
    african INT,
    white INT,
    asian INT,
    hispanic INT,
    native INT,
    pacificIslander INT,
    stateName VARCHAR(2),
    districtId INT,
    countyId INT,
    precinctId INT,
    censusBlockId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (stateName) REFERENCES States(name),
    FOREIGN KEY (districtId) REFERENCES Districts(id),
    FOREIGN KEY (countyId) REFERENCES Counties(id),
    FOREIGN KEY (precinctId) REFERENCES Precincts(id),
    FOREIGN KEY (censusBlockId) REFERENCES CensusBlocks(id)
);

CREATE TABLE IF NOT EXISTS BoxWhiskers (
    id INT NOT NULL AUTO_INCREMENT,
    basis TEXT,
    minimum FLOAT,
    maximum FLOAT,
    median FLOAT,
    firstQuartile FLOAT,
    thirdQuartile FLOAT,
    stateName VARCHAR(2),
    PRIMARY KEY (id),
    FOREIGN KEY (stateName) REFERENCES States(name)
);

CREATE TABLE IF NOT EXISTS NeighboringPrecincts (
    primaryPrecinctId INT NOT NULL,
    neighborPrecinctId INT NOT NULL,
    PRIMARY KEY (primaryPrecinctId, neighborPrecinctId),
    FOREIGN KEY (primaryPrecinctId) REFERENCES Precincts(id),
    FOREIGN KEY (neighborPrecinctId) REFERENCES Precincts(id)
);

CREATE TABLE IF NOT EXISTS NeighboringCBs (
    primaryCBId INT NOT NULL,
    neighborCBId INT NOT NULL,
    PRIMARY KEY (primaryCBId, neighborCBId),
    FOREIGN KEY (primaryCBId) REFERENCES CensusBlocks(id),
    FOREIGN KEY (neighborCBId) REFERENCES CensusBlocks(id)
);

CREATE TABLE IF NOT EXISTS Elections (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT,
    democratic INT,
    republican INT,
    stateName VARCHAR(2),
    districtId INT,
    countyId INT,
    precinctId INT,
    censusBlockId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (stateName) REFERENCES States(name),
    FOREIGN KEY (districtId) REFERENCES Districts(id),
    FOREIGN KEY (countyId) REFERENCES Counties(id),
    FOREIGN KEY (precinctId) REFERENCES Precincts(id),
    FOREIGN KEY (censusBlockId) REFERENCES CensusBlocks(id)
);