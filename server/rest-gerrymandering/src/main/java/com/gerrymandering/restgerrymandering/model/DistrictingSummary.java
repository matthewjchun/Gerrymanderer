package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class DistrictingSummary {

    private long id;
    private double populationEqualityTotal;
    private double populationEqualityVAP;
    private double populationEqualityCVAP;
    private double avgPolsbyPopper;
    private int majorityMinorityCountTotal;
    private int majorityMinorityCountVAP;
    private int majorityMinorityCountCVAP;
    private List<DistrictSummary> districtSummaries;

    public DistrictingSummary() {}

    public void populateSummary(Districting districting) {
        id = districting.getId();
        populationEqualityTotal = districting.getPopulationEqualityTotal();
        populationEqualityVAP = districting.getPopulationEqualityVAP();
        populationEqualityCVAP = districting.getPopulationEqualityCVAP();
        avgPolsbyPopper = districting.getAvgPolsbyPopper();
        majorityMinorityCountTotal = districting.getMajorityMinorityCountTotal();
        majorityMinorityCountVAP = districting.getMajorityMinorityCountVAP();
        majorityMinorityCountCVAP = districting.getMajorityMinorityCountCVAP();
        List<DistrictSummary> summaryList = new ArrayList<>();
        for (District district: districting.getDistricts()) {
            DistrictSummary summary = new DistrictSummary();
            summary.populateSummary(district);
            summaryList.add(summary);
        }
        districtSummaries = summaryList;
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

    public List<DistrictSummary> getDistrictSummaries() {
        return districtSummaries;
    }
}
