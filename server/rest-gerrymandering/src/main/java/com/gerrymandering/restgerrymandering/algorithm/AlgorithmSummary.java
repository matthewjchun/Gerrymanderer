package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.model.Precinct;

import java.util.List;

public class AlgorithmSummary {

    private int numberIterations;

    private int maxIterations;

    private long estimatedTime;

    private boolean isRunning;

    private String stateName;

    private double populationEquality;

    private double avgPolsbyPopper;

    private int majorityMinority;

    private List<Precinct> splitPrecincts;

//    private Geometry districtingBoundary;

// setters & getters

    public int getNumberIterations(){
        return numberIterations;
    }

    public void setNumberIterations(int numberIterations) {
        this.numberIterations = numberIterations;
    }

    public int getMaxIterations() {
        return maxIterations;
    }

    public void setMaxIterations(int maxIterations) {
        this.maxIterations = maxIterations;
    }

    public long getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(long estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
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

    public void setAvgPolsbyPopper(double AvgPolsbyPopper) {
        this.avgPolsbyPopper = avgPolsbyPopper;
    }

    public int getMajorityMinority() {
        return majorityMinority;
    }

    public void setMajorityMinority(int majorityMinority) {
        this.majorityMinority = majorityMinority;
    }

    public List<Precinct> getSplitPrecincts() {
        return splitPrecincts;
    }

    public void setSplitPrecincts(List<Precinct> splitPrecincts) {
        this.splitPrecincts = splitPrecincts;
    }

//    public Geometry getDistrictingBoundary(){
//        return districtingBoundary;
//    }
//
//    public void setDistrictingBoundary(Geometry districtingBoundary){
//        this.districtingBoundary = districtingBoundary;
//    }

    public void setAllMeasures(Measures measures){
        // population eq: double, polsbyPopper: double, majority minority: int
        double popEq = measures.getPopulationEquality();
        double polsby = measures.getAvgPolsbyPopper();
        int majMin = measures.getMajorityMinorityCount();

        this.setPopulationEquality(popEq);
        this.setAvgPolsbyPopper(polsby);
        this.setMajorityMinority(majMin);
    }
}