package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting {

    @Id
    @GeneratedValue
    private long id;

    private double populationEquality;

    private double avgPolsbyPopper;

    private int majorityMinorityCount;

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

    @Transient
    private List<DistrictingSummary> districtingSummaries;

    public void sortDistricts() {
        //Collections.sort(districts);
    }

    // GETTERS AND SETTERS

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPopulationEquality() {
        return populationEquality;
    }

    public void setPopulationEquality(double populationEquality) {
        this.populationEquality = populationEquality;
    }

    public double getAvgPolsbyPopper() {
        return avgPolsbyPopper;
    }

    public void setAvgPolsbyPopper(double avgPolsbyPopper) {
        this.avgPolsbyPopper = avgPolsbyPopper;
    }

    public int getMajorityMinorityCount() {
        return majorityMinorityCount;
    }

    public void setMajorityMinorityCount(int majorityMinorityCount) {
        this.majorityMinorityCount = majorityMinorityCount;
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

    // other stuff

    // public Districting(Long id, State state, List<District> districts, Measures measures, double populationEqualityThreshold,
    //                    double polsbyPopperThreshold, int majorityMinorityThreshold, int splitPrecincts,
    //                    List<DistrictSummary> districtSummaries, String districtPath, String precinctPath,
    //                    String countyPath){

    //     this.id = id;
    //     this.state = state;
    //     this.districts = districts;
    //     this.measures = measures;
    //     this.populationEqualityThreshold = populationEqualityThreshold;
    //     this.polsbyPopperThreshold = polsbyPopperThreshold;
    //     this.majorityMinorityThreshold = majorityMinorityThreshold;
    //     this.splitPrecincts = splitPrecincts;
    //     this.districtSummaries = districtSummaries;
    //     this.districtPath = districtPath;
    //     this.precinctPath = precinctPath;
    //     this.countyPath = countyPath;
    // }

    public Districting clone(){
        // Long id = this.getId();
        // State state = this.getState();
        // List<District> districts = this.getDistricts();
        // Measures measures = this.getMeasures();
        // double popEqThresh = this.getPopulationEqualityThreshold();
        // double polsbyThresh = this.getPolsbyPopperThreshold();
        // int majMinThresh = this.getMajorityMinorityThreshold();
        // int split = this.getSplitPrecincts();
        // List<DistrictSummary> districtSum = this.getDistrictSummaries();
        // String dPath = this.getDistrictPath();
        // String pPath = this.getPrecinctPath();
        // String cPath = this.getCountyPath();

        return null;
    }

    public boolean moveCBFromLargestToSmallestDistrict(){
        Districting selectedDistricting = this.clone();
        District sourceDistrict = selectedDistricting.getLargestDistrict();

        CensusBlock selectedCB = sourceDistrict.getRandomBorderCB();

        List<CensusBlock> neighborList = selectedCB.getNeighborCBInDiffDistrict();

        District destDistrict = selectedDistricting.getLeastPopDistrict(neighborList);

        boolean moveSuccess = sourceDistrict.moveCB(selectedCB, destDistrict);

        return moveSuccess;
    }

    public District getLargestDistrict(){
        int largest = 0;
        District largestDis = districts.get(0);
        for (District dis : districts){
            if (dis.getPopulation().getPopulationValue() > largest){
                largest = dis.getPopulation().getPopulationValue();
                largestDis = dis;
            }
        }
        return largestDis;
    }

    public District getSmallestDistrict(){
        District smallestDis = this.getLargestDistrict();
        int smallest = smallestDis.getPopulation().getPopulationValue();
        for (District dis : districts){
            if (dis.getPopulation().getPopulationValue() < smallest){
                smallest = dis.getPopulation().getPopulationValue();
                smallestDis = dis;
            }
        }
        return smallestDis;
    }

    public District getDistrictById(long id){
        for(District dis : districts){
            if(dis.getId() == id){
                return dis;
            }
        }
        return null;
    }

    public District getLeastPopDistrict(List<CensusBlock> neighbors){
        
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

    public int getTotalPopulation(){
        int sum = 0;
        for(District dis : districts){
            sum += dis.getPopulation().getPopulationValue();
        }
        return sum;
    }

    public boolean isImproved(Measures currentDistrictingMeasures){
        return false;
    }

    public boolean validateThresholds(){
        return false;
    }

    // public List<Double> getBoxAndWhiskerPoints(Demographic basis) {}




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

    public List<DistrictingSummary> getDistrictingSummaries() {
        return districtingSummaries;
    }

    public void setDistrictingSummaries(List<DistrictingSummary> districtingSummaries) {
        this.districtingSummaries = districtingSummaries;
    }
}
