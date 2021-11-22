package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.model.Precinct;
import org.opengis.geometry.Geometry;

import java.util.List;

public class AlgorithmSummary {

    private int numberIterations;

    private int maxIterations;

    private int estimatedTime;

    private boolean running;

    private String stateName;

    private double populationEquality;

    private double avgPolsbyPopper;

    private int majorityMinorityCount;

    private List<Precinct> splitPrecincts;

    private Geometry districtingBoundary;

    public AlgorithmSummary(int numberIterations, int maxIterations, int estimatedTime, boolean running,
                            String stateName, double populationEquality, double avgPolsbyPopper,
                            int majorityMinorityCount, List<Precinct> splitPrecincts, Geometry districtingBoundary) {
        this.numberIterations = numberIterations;
        this.maxIterations = maxIterations;
        this.estimatedTime = estimatedTime;
        this.running = running;
        this.stateName = stateName;
        this.populationEquality = populationEquality;
        this.avgPolsbyPopper = avgPolsbyPopper;
        this.majorityMinorityCount = majorityMinorityCount;
        this.splitPrecincts = splitPrecincts;
        this.districtingBoundary = districtingBoundary;
    }

    public void setAllMeasures(double populationEquality, double avgPolsbyPopper, int majorityMinorityCount) {
        setPopulationEquality(populationEquality);
        setAvgPolsbyPopper(avgPolsbyPopper);
        setMajorityMinorityCount(majorityMinorityCount);
    }

    // GETTERS AND SETTERS
    public int getNumberIterations() {
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

    public int getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(int estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public boolean isRunning() {
        return running;
    }

    public void setRunning(boolean running) {
        this.running = running;
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

    public void setAvgPolsbyPopper(double avgPolsbyPopper) {
        this.avgPolsbyPopper = avgPolsbyPopper;
    }

    public int getMajorityMinorityCount() {
        return majorityMinorityCount;
    }

    public void setMajorityMinorityCount(int majorityMinorityCount) {
        this.majorityMinorityCount = majorityMinorityCount;
    }

    public List<Precinct> getSplitPrecincts() {
        return splitPrecincts;
    }

    public void setSplitPrecincts(List<Precinct> splitPrecincts) {
        this.splitPrecincts = splitPrecincts;
    }

    public Geometry getDistrictingBoundary() {
        return districtingBoundary;
    }

    public void setDistrictingBoundary(Geometry districtingBoundary) {
        this.districtingBoundary = districtingBoundary;
    }
}