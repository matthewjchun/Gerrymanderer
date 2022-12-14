package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.District;
import com.gerrymandering.restgerrymandering.model.DistrictSummary;
import com.gerrymandering.restgerrymandering.model.Districting;
import com.gerrymandering.restgerrymandering.model.Precinct;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

public class AlgorithmSummary {

    private int numberIterations;

    private int numberCensusBlocksMoved;

    private int estimatedTime;

    private boolean running;

    private boolean paused;

    private String stateName;

    private double populationEqualityTotal;

    private double populationEqualityVAP;

    private double populationEqualityCVAP;

    private double avgPolsbyPopper;

    private int majorityMinorityCountTotal;

    private int majorityMinorityCountVAP;

    private int majorityMinorityCountCVAP;

    private List<Precinct> splitPrecincts;

    private JsonObject districtingBoundary;

    private List<DistrictSummary> districtSummaries;

    public AlgorithmSummary(int numberIterations, int numberCensusBlocksMoved, int estimatedTime, boolean running,
                            boolean paused, String stateName, double populationEqualityTotal,
                            double populationEqualityVAP, double populationEqualityCVAP,
                            double avgPolsbyPopper, int majorityMinorityCountTotal, int majorityMinorityCountVAP,
                            int majorityMinorityCountCVAP, List<Precinct> splitPrecincts,
                            JsonObject districtingBoundary, List<DistrictSummary> districtSummaries) {
        this.numberIterations = numberIterations;
        this.numberCensusBlocksMoved = numberCensusBlocksMoved;
        this.estimatedTime = estimatedTime;
        this.running = running;
        this.paused = paused;
        this.stateName = stateName;
        this.populationEqualityTotal = populationEqualityTotal;
        this.populationEqualityVAP = populationEqualityVAP;
        this.populationEqualityCVAP = populationEqualityCVAP;
        this.avgPolsbyPopper = avgPolsbyPopper;
        this.majorityMinorityCountTotal = majorityMinorityCountTotal;
        this.majorityMinorityCountVAP = majorityMinorityCountVAP;
        this.majorityMinorityCountCVAP = majorityMinorityCountCVAP;
        this.splitPrecincts = splitPrecincts;
        this.districtingBoundary = districtingBoundary;
        this.districtSummaries = districtSummaries;
    }

    public void updateMeasures(Districting districting) {
        setPopulationEqualityTotal(districting.getPopulationEqualityTotal());
        setPopulationEqualityVAP(districting.getPopulationEqualityVAP());
        setPopulationEqualityCVAP(districting.getPopulationEqualityCVAP());
        setAvgPolsbyPopper(districting.getAvgPolsbyPopper());
        setMajorityMinorityCountTotal(districting.getMajorityMinorityCountTotal());
        setMajorityMinorityCountVAP(districting.getMajorityMinorityCountVAP());
        setMajorityMinorityCountCVAP(districting.getMajorityMinorityCountCVAP());
    }

    public void updateDistrictPopulations(Districting districting) {
        List<DistrictSummary> summaryList = new ArrayList<>();
        for (District district: districting.getDistricts()) {
            DistrictSummary summary = new DistrictSummary();
            summary.populateSummary(district);
            summaryList.add(summary);
        }
        districtSummaries = summaryList;
    }

    // GETTERS AND SETTERS
    public int getNumberIterations() {
        return numberIterations;
    }

    public void setNumberIterations(int numberIterations) {
        this.numberIterations = numberIterations;
    }

    public int getNumberCensusBlocksMoved() {
        return numberCensusBlocksMoved;
    }

    public void setNumberCensusBlocksMoved(int numberCensusBlocksMoved) {
        this.numberCensusBlocksMoved = numberCensusBlocksMoved;
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

    public boolean isPaused() {
        return paused;
    }

    public void setPaused(boolean paused) {
        this.paused = paused;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
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

    public List<Precinct> getSplitPrecincts() {
        return splitPrecincts;
    }

    public void setSplitPrecincts(List<Precinct> splitPrecincts) {
        this.splitPrecincts = splitPrecincts;
    }

    public JsonObject getDistrictingBoundary() {
        return districtingBoundary;
    }

    public void setDistrictingBoundary(JsonObject districtingBoundary) {
        this.districtingBoundary = districtingBoundary;
    }

    public List<DistrictSummary> getDistrictSummaries() {
        return districtSummaries;
    }

    public void setDistrictSummaries(List<DistrictSummary> districtSummaries) {
        this.districtSummaries = districtSummaries;
    }
}