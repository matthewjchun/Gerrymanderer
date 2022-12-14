package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.locationtech.jts.dissolve.LineDissolver;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.io.geojson.GeoJsonReader;
import org.locationtech.jts.io.geojson.GeoJsonWriter;

import javax.persistence.*;
import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting implements Cloneable {

    @Id
    @GeneratedValue
    private long id;

    private double populationEqualityTotal;

    private double populationEqualityVAP;

    private double populationEqualityCVAP;

    private double avgPolsbyPopper;

    private int majorityMinorityCountTotal;

    private int majorityMinorityCountVAP;

    private int majorityMinorityCountCVAP;

    private double objectiveValue;

    private String districtPath;

    private String precinctPath;

    private String countyPath;

    @OneToMany
    @JoinColumn(name = "districtingId", referencedColumnName = "id")
    private List<District> districts;

    @Transient
    private int splitPrecincts;

    public Districting() {
    }

    public Districting(long id, double populationEqualityTotal, double populationEqualityVAP,
            double populationEqualityCVAP, double avgPolsbyPopper, int majorityMinorityCountTotal,
            int majorityMinorityCountVAP, int majorityMinorityCountCVAP, double objectiveValue, String districtPath,
            String precinctPath, String countyPath, List<District> districts, int splitPrecincts) {
        this.id = id;
        this.populationEqualityTotal = populationEqualityTotal;
        this.populationEqualityVAP = populationEqualityVAP;
        this.populationEqualityCVAP = populationEqualityCVAP;
        this.avgPolsbyPopper = avgPolsbyPopper;
        this.majorityMinorityCountTotal = majorityMinorityCountTotal;
        this.majorityMinorityCountVAP = majorityMinorityCountVAP;
        this.majorityMinorityCountCVAP = majorityMinorityCountCVAP;
        this.objectiveValue = objectiveValue;
        this.districtPath = districtPath;
        this.precinctPath = precinctPath;
        this.countyPath = countyPath;
        this.districts = districts;
        this.splitPrecincts = splitPrecincts;
    }

    @Override
    public Object clone() {
        Districting districting;
        try {
            districting = (Districting) super.clone();
        } catch (CloneNotSupportedException e) {
            districting = new Districting(id, populationEqualityTotal, populationEqualityVAP, populationEqualityCVAP,
                    avgPolsbyPopper, majorityMinorityCountTotal, majorityMinorityCountVAP, majorityMinorityCountCVAP, objectiveValue,
                    districtPath, precinctPath, countyPath, districts, splitPrecincts);
        }
        List<District> districtsClone = new ArrayList<>();
        for (District district : districts) {
            districtsClone.add((District) district.clone());
        }
        districting.setDistricts(districtsClone);
        return districting;
    }

    public static void sortDistricts(List<District> districts, Constants.PopulationType type) {
        districts.sort(new DistrictComparator(type));
    }

    public void recalculateObjective() {
        setObjectiveValue(0.6 * (1 - populationEqualityTotal) + 0.4 * avgPolsbyPopper);
    }

    public boolean moveCBFromLargestToSmallestDistrict(Districting selectedDistricting, Constants.PopulationType type,
                                                       List<Long> removed, List<Long> added,
                                                       List<CensusBlock> moved) {
        List<District> candidateSourceDistricts = new ArrayList<>(districts);
        System.out.println("Sort");
        Districting.sortDistricts(candidateSourceDistricts, type);
        District sourceDistrict = null;
        CensusBlock selectedCB = null;
        List<CensusBlock> neighborList = new ArrayList<>();
        for (District district: candidateSourceDistricts) {
            selectedCB = district.selectBorderCB();
            if (selectedCB != null) {
                neighborList = selectedCB.getNeighborCBInDiffDistrict();
                if (neighborList.size() > 0) {
                    sourceDistrict = district;
                    break;
                }
            }
            selectedCB = null;
            neighborList = new ArrayList<>();
        }
        if (selectedCB == null || neighborList.size() == 0) {
            System.out.println("Could not find movable census block.");
            return false;
        }
        District destDistrict = selectedDistricting.getSmallestDistrictInNeighbors(neighborList, type);
        return sourceDistrict.moveCB(selectedCB, destDistrict, removed, added, moved);
    }

    public District getLargestDistrict(Constants.PopulationType type) {
        District largestDistrict = districts.get(0);
        Population largestPopulation = largestDistrict.getPopulationByType(type);
        int largestPopulationValue = largestPopulation.getTotal();
        for (District district : districts) {
            Population currentPopulation = district.getPopulationByType(type);
            int currentPopulationValue = currentPopulation.getTotal();
            if (currentPopulationValue > largestPopulationValue) {
                largestDistrict = district;
                largestPopulationValue = currentPopulationValue;
            }
        }
        return largestDistrict;
    }

    public District getSmallestDistrict(Constants.PopulationType type) {
        District smallestDistrict = districts.get(0);
        Population smallestPopulation = smallestDistrict.getPopulationByType(type);
        int smallestPopulationValue = smallestPopulation.getTotal();
        for (District district : districts) {
            Population currentPopulation = district.getPopulationByType(type);
            int currentPopulationValue = currentPopulation.getTotal();
            if (currentPopulationValue < smallestPopulationValue) {
                smallestDistrict = district;
                smallestPopulationValue = currentPopulationValue;
            }
        }
        return smallestDistrict;
    }

    public District getSmallestDistrictInNeighbors(List<CensusBlock> neighbors, Constants.PopulationType type) {
        System.out.println("Finding smallest district in neighbors.");
        District smallestDistrict = neighbors.get(0).getDistrict();
        Population leastPopulation = neighbors.get(0).getDistrict().getPopulationByType(type);
        int leastPopulationValue = leastPopulation.getTotal();
        for (CensusBlock neighbor : neighbors) {
            District neighborDistrict = neighbor.getDistrict();
            Population neighborDistrictPopulation = neighborDistrict.getPopulationByType(type);
            int neighborDistrictPopulationValue = neighborDistrictPopulation.getTotal();
            if (neighborDistrictPopulationValue < leastPopulationValue) {
                leastPopulationValue = neighborDistrictPopulationValue;
                smallestDistrict = neighborDistrict;
            }
        }
        return smallestDistrict;
    }

    // Might not need this
    public District getDistrictById(long id) {
        for (District dis : districts) {
            if (dis.getId() == id) {
                return dis;
            }
        }
        return null;
    }

    public double getObjectiveFunctionScore() {
        return 0.0;
    }

    public void calculatePopulationEquality() {
        for (Constants.PopulationType type : Constants.PopulationType.values()) {
            District largestDistrict = getLargestDistrict(type);
            Population largestDistrictPopulation = largestDistrict.getPopulationByType(type);
            District smallestDistrict = getSmallestDistrict(type);
            Population smallestDistrictPopulation = smallestDistrict.getPopulationByType(type);
            int totalPopulation = getTotalPopulation(type);
            double populationEquality = (double) Math
                    .abs(largestDistrictPopulation.getTotal() - smallestDistrictPopulation.getTotal())
                    / totalPopulation;
            switch (type) {
            case TOTAL:
                setPopulationEqualityTotal(populationEquality);
                break;
            case VAP:
                setPopulationEqualityVAP(populationEquality);
                break;
            case CVAP:
                setPopulationEqualityCVAP(populationEquality);
                break;
            default:
                break;
            }
        }
    }

    /*public void calculateAvgPolsbyPopper() {
        double sum = 0;
        int numDistricts = districts.size();
        for (District district : districts) {
            district.calculatePolsbyPopper();
            sum += district.getPolsbyPopper();
        }
        setAvgPolsbyPopper(sum / numDistricts);
    }*/

    public void calculateMajorityMinorityCount() {
        for (Constants.PopulationType type : Constants.PopulationType.values()) {
            int majorityMinorityCountTotal = 0, majorityMinorityCountVAP = 0, majorityMinorityCountCVAP = 0;
            for (District district : districts) {
                switch (type) {
                    case TOTAL:
                        if (district.isMajorityMinorityTotal())
                            majorityMinorityCountTotal++;
                    case VAP:
                        if (district.isMajorityMinorityVAP())
                            majorityMinorityCountVAP++;
                    case CVAP:
                        if (district.isMajorityMinorityCVAP())
                            majorityMinorityCountCVAP++;
                    default:
                        break;
                }
            }
            setMajorityMinorityCountTotal(majorityMinorityCountTotal);
            setMajorityMinorityCountVAP(majorityMinorityCountVAP);
            setMajorityMinorityCountCVAP(majorityMinorityCountCVAP);
        }
    }

    public List<JsonObject> calculateDistrictingBoundary(List<District> removed, List<District> added, List<CensusBlock> moved) {
        if (removed.size() != added.size() || removed.size() != moved.size()) {
            System.out.println("Error mismatch in counts for moved census blocks and affected districts.");
            return null;
        }
        List<JsonObject> districtBoundaries = new ArrayList<>();
        for (District district: districts) {
            int indexRemoved = removed.indexOf(district);
            if (indexRemoved == -1) {
                int indexAdded = added.indexOf(district);
                if (indexAdded == -1) { // if neither in removed or added, the district remains the same
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + district.getPath())) {
                        JsonObject districtFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        districtBoundaries.add(districtFeature);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading district file.");
                    }
                    continue;
                }
                else { // district received a census block
                    CensusBlock addedCb = moved.get(indexAdded);
                    JsonObject districtFeatureCollection = new JsonObject();
                    districtFeatureCollection.addProperty("type", "FeatureCollection");
                    JsonArray features = new JsonArray();
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + district.getPath())) {
                        JsonObject districtFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        features.add(districtFeature);
                        FileReader cbReader = new FileReader(Constants.getResourcePath() + addedCb.getPath());
                        JsonObject cbFeature = JsonParser.parseReader(cbReader).getAsJsonObject();
                        features.add(cbFeature);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading district or cb file.");
                    }
                    districtFeatureCollection.add("features", features);
                    districtBoundaries.add(districtFeatureCollection);
                }
            }
            else { // district lost a census block
                CensusBlock removedCb = moved.get(indexRemoved);
                JsonObject districtFeatureCollection = new JsonObject();
                districtFeatureCollection.addProperty("type", "FeatureCollection");
                JsonArray features = new JsonArray();
                for (CensusBlock cb: district.getCensusBlocks()) {
                    if (cb.equals(removedCb))
                        continue;
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + cb.getPath())) {
                        JsonObject cbFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        features.add(cbFeature);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading cb file.");
                    }
                }
                districtFeatureCollection.add("features", features);
                districtBoundaries.add(districtFeatureCollection);
            }
        }
        return districtBoundaries;
    }

    public JsonObject calculateDistrictingBoundaryTest(List<Long> removed, List<Long> added, List<CensusBlock> moved) {
        if (removed.size() != added.size() || removed.size() != moved.size()) {
            System.out.println("Error mismatch in counts for moved census blocks and affected districts.");
            return null;
        }
        GeometryFactory gf = new GeometryFactory();
        GeoJsonReader geoReader = new GeoJsonReader();
        GeoJsonWriter geoWriter = new GeoJsonWriter();
        JsonObject districtingBoundary = new JsonObject();
        districtingBoundary.addProperty("type", "FeatureCollection");
        JsonArray features = new JsonArray();
        for (District district: districts) {
            int indexRemoved = removed.indexOf(district.getId());
            if (indexRemoved == -1) {
                int indexAdded = added.indexOf(district.getId());
                if (indexAdded == -1) { // if neither in removed or added, the district remains the same
                    System.out.println("District " + district.getId() + " is the same.");
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + district.getPath())) {
                        JsonObject districtFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        features.add(districtFeature);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading district file.");
                    }
                }
                else { // district received a census block
                    System.out.println("District " + district.getId() + " got new cb.");
                    CensusBlock addedCb = moved.get(indexAdded);
                    JsonObject compositeDistrictFeature = new JsonObject();
                    compositeDistrictFeature.addProperty("type", "Feature");
                    List<Geometry> geometries = new ArrayList<>();
                    JsonObject properties = new JsonObject();
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + district.getPath())) {
                        JsonObject districtFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        properties = districtFeature.getAsJsonObject("properties");
                        String districtGeometryStr = districtFeature.getAsJsonObject("geometry").toString();
                        Geometry districtGeometry = geoReader.read(new StringReader(districtGeometryStr));
                        geometries.add(districtGeometry);
                        FileReader cbReader = new FileReader(Constants.getResourcePath() + addedCb.getPath());
                        JsonObject cbFeature = JsonParser.parseReader(cbReader).getAsJsonObject();
                        String cbGeometryStr = cbFeature.getAsJsonObject("geometry").toString();
                        Geometry cbGeometry = geoReader.read(new StringReader(cbGeometryStr));
                        geometries.add(cbGeometry);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading district or cb file.");
                    }
                    //Geometry dissolved = LineDissolver.dissolve(gf.createGeometryCollection(geometries.toArray(new Geometry[] {})));
                    Geometry union = gf.createGeometryCollection(geometries.toArray(new Geometry[] {})).union();
                    String boundaryStr = geoWriter.write(union.getBoundary());
                    JsonObject boundary = JsonParser.parseString(boundaryStr).getAsJsonObject();
                    JsonArray coordinates = boundary.get("coordinates").getAsJsonArray();
                    boundary.addProperty("type", "Polygon");
                    if (!coordinates.get(0).getAsJsonArray().get(0).isJsonArray()) {
                        JsonArray outer = new JsonArray();
                        outer.add(coordinates);
                        boundary.add("coordinates", outer);
                    }
                    compositeDistrictFeature.add("geometry", boundary);
                    compositeDistrictFeature.add("properties", properties);
                    features.add(compositeDistrictFeature);
                }
            }
            else { // district lost a census block
                System.out.println("District " + district.getId() + " lost cb.");
                CensusBlock removedCb = moved.get(indexRemoved);
                JsonObject compositeDistrictFeature = new JsonObject();
                compositeDistrictFeature.addProperty("type", "Feature");
                JsonObject properties = new JsonObject();
                try (FileReader reader = new FileReader(Constants.getResourcePath() + district.getPath())) {
                    JsonObject districtFeature = JsonParser.parseReader(reader).getAsJsonObject();
                    properties = districtFeature.getAsJsonObject("properties");
                } catch (Exception e) {
                    System.out.println("Calculating districting boundary error reading district file.");
                }
                List<Geometry> geometries = new ArrayList<>();
                for (CensusBlock cb: district.getCensusBlocks()) {
                    if (cb.getId() == removedCb.getId())
                        continue;
                    try (FileReader reader = new FileReader(Constants.getResourcePath() + cb.getPath())) {
                        JsonObject cbFeature = JsonParser.parseReader(reader).getAsJsonObject();
                        String cbGeometryStr = cbFeature.getAsJsonObject("geometry").toString();
                        Geometry cbGeometry = geoReader.read(new StringReader(cbGeometryStr));
                        geometries.add(cbGeometry);
                    } catch (Exception e) {
                        System.out.println("Calculating districting boundary error reading cb file.");
                    }
                }
                //Geometry dissolved = LineDissolver.dissolve(gf.createGeometryCollection(geometries.toArray(new Geometry[] {})));
                Geometry union = gf.createGeometryCollection(geometries.toArray(new Geometry[] {})).union();
                String boundaryStr = geoWriter.write(union.getBoundary());
                JsonObject boundary = JsonParser.parseString(boundaryStr).getAsJsonObject();
                JsonArray coordinates = boundary.get("coordinates").getAsJsonArray();
                boundary.addProperty("type", "Polygon");
                if (!coordinates.get(0).getAsJsonArray().get(0).isJsonArray()) {
                    JsonArray outer = new JsonArray();
                    outer.add(coordinates);
                    boundary.add("coordinates", outer);
                }
                compositeDistrictFeature.add("geometry", boundary);
                compositeDistrictFeature.add("properties", properties);
                features.add(compositeDistrictFeature);
            }
        }
        districtingBoundary.add("features", features);
        return districtingBoundary;
    }

    public void calculateSplitPrecincts() {

    }

    public int getTotalPopulation(Constants.PopulationType type) {
        int sum = 0;
        for (District district : districts) {
            sum += district.getPopulationByType(type).getTotal();
        }
        return sum;
    }

    public boolean isImproved(Districting previousDistricting, Constants.PopulationType type) {
        switch (type) {
        case TOTAL:
            return populationEqualityTotal < previousDistricting.getPopulationEqualityTotal();
        case VAP:
            return populationEqualityVAP < previousDistricting.getPopulationEqualityVAP();
        case CVAP:
            return populationEqualityCVAP < previousDistricting.getPopulationEqualityCVAP();
        default:
            return false;
        }
    }

    public boolean validateThresholds(double popEqualityThresh, int majorityMinorityThresh, Constants.PopulationType type) {
        switch (type) {
        case TOTAL:
            return populationEqualityTotal <= popEqualityThresh && majorityMinorityCountTotal <= majorityMinorityThresh;
        case VAP:
            return populationEqualityVAP <= popEqualityThresh && majorityMinorityCountVAP <= majorityMinorityThresh;
        case CVAP:
            return populationEqualityCVAP <= popEqualityThresh && majorityMinorityCountCVAP <= majorityMinorityThresh;
        default:
            return false;
        }
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPopulationEqualityTotal() {
        return populationEqualityTotal;
    }

    public void setPopulationEqualityTotal(double populationEqualityTotal) {
        this.populationEqualityTotal = populationEqualityTotal;
    }

    public double getPopulationEqualityVAP() {
        return populationEqualityVAP;
    }

    public void setPopulationEqualityVAP(double populationEqualityVAP) {
        this.populationEqualityVAP = populationEqualityVAP;
    }

    public double getPopulationEqualityCVAP() {
        return populationEqualityCVAP;
    }

    public void setPopulationEqualityCVAP(double populationEqualityCVAP) {
        this.populationEqualityCVAP = populationEqualityCVAP;
    }

    public double getAvgPolsbyPopper() {
        return avgPolsbyPopper;
    }

    public void setAvgPolsbyPopper(double avgPolsbyPopper) {
        this.avgPolsbyPopper = avgPolsbyPopper;
    }

    public int getMajorityMinorityCountTotal() {
        return majorityMinorityCountTotal;
    }

    public void setMajorityMinorityCountTotal(int majorityMinorityCountTotal) {
        this.majorityMinorityCountTotal = majorityMinorityCountTotal;
    }

    public int getMajorityMinorityCountVAP() {
        return majorityMinorityCountVAP;
    }

    public void setMajorityMinorityCountVAP(int majorityMinorityCountVAP) {
        this.majorityMinorityCountVAP = majorityMinorityCountVAP;
    }

    public int getMajorityMinorityCountCVAP() {
        return majorityMinorityCountCVAP;
    }

    public void setMajorityMinorityCountCVAP(int majorityMinorityCountCVAP) {
        this.majorityMinorityCountCVAP = majorityMinorityCountCVAP;
    }

    public double getObjectiveValue() {
        return objectiveValue;
    }

    public void setObjectiveValue(double objectiveValue) {
        this.objectiveValue = objectiveValue;
    }

    public String getDistrictPath() {
        return districtPath;
    }

    public void setDistrictPath(String districtPath) {
        this.districtPath = districtPath;
    }

    public String getPrecinctPath() {
        return precinctPath;
    }

    public void setPrecinctPath(String precinctPath) {
        this.precinctPath = precinctPath;
    }

    public String getCountyPath() {
        return countyPath;
    }

    public void setCountyPath(String countyPath) {
        this.countyPath = countyPath;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }

    public int getSplitPrecincts() {
        return splitPrecincts;
    }

    public void setSplitPrecincts(int splitPrecincts) {
        this.splitPrecincts = splitPrecincts;
    }
}
