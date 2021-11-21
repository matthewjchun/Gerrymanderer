package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "StateName")
    private State state;

    @OneToMany
    private List<District> districts;

    @JoinColumn(name = "DistrictingId")
    private Measures measures;

    private double populationEqualityThreshold;

    private double polsbyPopperThreshold;

    private int majorityMinorityThreshold;

    private int splitPrecincts;

    private List<DistrictSummary> districtSummaries;

    private String districtPath;

    private String precinctPath;

    private String countyPath;

    // getters n setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public State getState() { return state; }

    public void setState(State state) { this.state = state; }

    public List<District> getDistricts() { return districts; }

    public void setDistricts(List<District> districts) { this.districts = districts; }

    public Measures getMeasures() { return this.measures; }

    public void setMeasures(Measures measures) { this.measures = measures; }

    public double getPopulationEqualityThreshold() { return populationEqualityThreshold; }

    public void setPopulationEqualityThreshold(double populationEqualityThreshold) {
        this.populationEqualityThreshold = populationEqualityThreshold;
    }

    public double getPolsbyPopperThreshold() { return polsbyPopperThreshold; }

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

    public List<DistrictSummary> getDistrictSummaries() {
        return districtSummaries;
    }

    public void setDistrictSummaries(List<DistrictSummary> districtSummaries) {
        this.districtSummaries = districtSummaries;
    }

    public String getDistrictPath() { return districtPath; }

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

    public Districting(Long id, State state, List<District> districts, Measures measures, double populationEqualityThreshold,
                       double polsbyPopperThreshold, int majorityMinorityThreshold, int splitPrecincts,
                       List<DistrictSummary> districtSummaries, String districtPath, String precinctPath,
                       String countyPath){

        this.id = id;
        this.state = state;
        this.districts = districts;
        this.measures = measures;
        this.populationEqualityThreshold = populationEqualityThreshold;
        this.polsbyPopperThreshold = polsbyPopperThreshold;
        this.majorityMinorityThreshold = majorityMinorityThreshold;
        this.splitPrecincts = splitPrecincts;
        this.districtSummaries = districtSummaries;
        this.districtPath = districtPath;
        this.precinctPath = precinctPath;
        this.countyPath = countyPath;
    }

    public Districting clone(){
        Long id = this.getId();
        State state = this.getState();
        List<District> districts = this.getDistricts();
        Measures measures = this.getMeasures();
        double popEqThresh = this.getPopulationEqualityThreshold();
        double polsbyThresh = this.getPolsbyPopperThreshold();
        int majMinThresh = this.getMajorityMinorityThreshold();
        int split = this.getSplitPrecincts();
        List<DistrictSummary> districtSum = this.getDistrictSummaries();
        String dPath = this.getDistrictPath();
        String pPath = this.getPrecinctPath();
        String cPath = this.getCountyPath();

        return new Districting(id, state, districts, measures, popEqThresh, polsbyThresh, majMinThresh, split,
                districtSum, dPath, pPath, cPath);
    }

    public void sortDistricts(){
        // STUB
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




}
