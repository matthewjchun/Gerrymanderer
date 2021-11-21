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
