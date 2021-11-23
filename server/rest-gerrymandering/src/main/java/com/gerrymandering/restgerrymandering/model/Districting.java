package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting implements Cloneable{

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

    private String districtPath;

    private String precinctPath;

    private String countyPath;

    @OneToMany
    @JoinColumn(name = "districtingId", referencedColumnName = "id")
    private List<District> districts;

    @Transient
    private double populationEqualityThreshold;

    @Transient
    private double polsbyPopperThreshold;

    @Transient
    private int majorityMinorityThreshold;

    @Transient
    private int splitPrecincts;

    public Districting() {}

    public Districting(long id, double populationEqualityTotal, double populationEqualityVAP,
                       double populationEqualityCVAP, double avgPolsbyPopper, int majorityMinorityCountTotal,
                       int majorityMinorityCountVAP, int majorityMinorityCountCVAP, String districtPath,
                       String precinctPath, String countyPath, List<District> districts,
                       double populationEqualityThreshold, double polsbyPopperThreshold, int majorityMinorityThreshold,
                       int splitPrecincts) {
        this.id = id;
        this.populationEqualityTotal = populationEqualityTotal;
        this.populationEqualityVAP = populationEqualityVAP;
        this.populationEqualityCVAP = populationEqualityCVAP;
        this.avgPolsbyPopper = avgPolsbyPopper;
        this.majorityMinorityCountTotal = majorityMinorityCountTotal;
        this.majorityMinorityCountVAP = majorityMinorityCountVAP;
        this.majorityMinorityCountCVAP = majorityMinorityCountCVAP;
        this.districtPath = districtPath;
        this.precinctPath = precinctPath;
        this.countyPath = countyPath;
        this.districts = districts;
        this.populationEqualityThreshold = populationEqualityThreshold;
        this.polsbyPopperThreshold = polsbyPopperThreshold;
        this.majorityMinorityThreshold = majorityMinorityThreshold;
        this.splitPrecincts = splitPrecincts;
    }

    @Override
    public Object clone() {
        Districting districting;
        try {
            districting = (Districting) super.clone();
        }
        catch (CloneNotSupportedException e) {
            districting = new Districting(id, populationEqualityTotal, populationEqualityVAP, populationEqualityCVAP,
                    avgPolsbyPopper, majorityMinorityCountTotal, majorityMinorityCountVAP, majorityMinorityCountCVAP,
                    districtPath, precinctPath, countyPath, districts, populationEqualityThreshold,
                    polsbyPopperThreshold, majorityMinorityThreshold, splitPrecincts);
        }
        List<District> districtsClone = new ArrayList<>();
        for (District district: districts) {
            districtsClone.add((District) district.clone());
        }
        districting.setDistricts(districtsClone);
        return districting;
    }

    // May not need this
    public void sortDistricts(Constants.PopulationType type) {
        districts.sort(new DistrictComparator(type));
    }

    public boolean moveCBFromLargestToSmallestDistrict(Districting selectedDistricting, Constants.PopulationType type){
        District sourceDistrict = selectedDistricting.getLargestDistrict(type);
        CensusBlock selectedCB = sourceDistrict.getRandomBorderCB();
        List<CensusBlock> neighborList = selectedCB.getNeighborCBInDiffDistrict();
        District destDistrict = selectedDistricting.getSmallestDistrictInNeighbors(neighborList, type);
        return sourceDistrict.moveCB(selectedCB, destDistrict);
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
        District smallestDistrict = neighbors.get(0).getDistrict();
        Population leastPopulation = neighbors.get(0).getDistrict().getPopulationByType(type);
        int leastPopulationValue = leastPopulation.getTotal();
        for (CensusBlock neighbor: neighbors) {
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


    public District getDistrictById (long id){
        for(District dis : districts){
            if(dis.getId() == id){
                return dis;
            }
        }
        return null;
    }


    public double getObjectiveFunctionScore() {
        return 0.0;
    }

    public void calculatePopulationEquality() {

    }

    public void calculateAllPolsbyPopper() {

    }

    public void calculateMajorityMinority() {

    }

    public void calculateSplitPrecincts() {

    }

    public void calculateAllMeasures() {
        this.calculatePopulationEquality();
        this.calculateAllPolsbyPopper();
        this.calculateMajorityMinority();
    }

    /*public int getTotalPopulation(){
        int sum = 0;
        for(District dis : districts){
            sum += dis.getPopulation().getPopulationValue();
        }
        return sum;
    }*/

    public boolean isImproved(){
        return false;
    }

    public boolean validateThresholds(){
        return false;
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

    public double getPopulationEqualityThreshold() {
        return populationEqualityThreshold;
    }

    public void setPopulationEqualityThreshold(double populationEqualityThreshold) {
        this.populationEqualityThreshold = populationEqualityThreshold;
    }

    public double getPolsbyPopperThreshold() {
        return polsbyPopperThreshold;
    }

    public void setPolsbyPopperThreshold(double polsbyPopperThreshold) {
        this.polsbyPopperThreshold = polsbyPopperThreshold;
    }

    public int getMajorityMinorityThreshold() {
        return majorityMinorityThreshold;
    }

    public void setMajorityMinorityThreshold(int majorityMinorityThreshold) {
        this.majorityMinorityThreshold = majorityMinorityThreshold;
    }

    public int getSplitPrecincts() {
        return splitPrecincts;
    }

    public void setSplitPrecincts(int splitPrecincts) {
        this.splitPrecincts = splitPrecincts;
    }
}
