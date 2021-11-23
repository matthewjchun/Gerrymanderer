package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "States")
public class State {

    @Id
    private String name;

    @Column(name = "centerLon")
    private double centerLon;

    @Column(name = "centerLat")
    private double centerLat;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    @OrderBy("name")
    private List<Election> elections;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<Districting> districtings;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private Set<County> counties;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<BoxAndWhisker> boxAndWhiskerData;

    @Transient
    private int selectedDistrictingId;

    @Transient
    private List<DistrictingSummary> districtingSummaries;

    public Districting getEnactedDistricting() {
        return districtings.get(Constants.getEnactedDistrictingIndex() +
                Constants.getDistrictingOffsets().get(name.toLowerCase()));
    }

    public Districting getSeaWulfDistricting(long districtingId) {
        return districtings.get((int)districtingId);
    }

    // GETTERS AND SETTERS
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCenterLon() {
        return centerLon;
    }

    public void setCenterLon(double centerLon) {
        this.centerLon = centerLon;
    }

    public double getCenterLat() {
        return centerLat;
    }

    public void setCenterLat(double centerLat) {
        this.centerLat = centerLat;
    }

    public List<Population> getPopulations() {
        return populations;
    }

    public void setPopulations(List<Population> populations) {
        this.populations = populations;
    }

    public List<Election> getElections() {
        return elections;
    }

    public void setElections(List<Election> elections) {
        this.elections = elections;
    }

    public List<Districting> getDistrictings() {
        return districtings;
    }

    public void setDistrictings(List<Districting> districtings) {
        this.districtings = districtings;
    }

    public Set<County> getCounties() {
        return counties;
    }

    public void setCounties(Set<County> counties) {
        this.counties = counties;
    }

    public List<BoxAndWhisker> getBoxAndWhiskerData() {
        return boxAndWhiskerData;
    }

    public void setBoxAndWhiskerData(List<BoxAndWhisker> boxAndWhiskerData) {
        this.boxAndWhiskerData = boxAndWhiskerData;
    }

    public int getSelectedDistrictingId() {
        return selectedDistrictingId;
    }

    public void setSelectedDistrictingId(int selectedDistrictingId) {
        this.selectedDistrictingId = selectedDistrictingId;
    }

    public List<DistrictingSummary> getDistrictingSummaries() {
        return districtingSummaries;
    }

    public void setDistrictingSummaries(List<DistrictingSummary> districtingSummaries) {
        this.districtingSummaries = districtingSummaries;
    }
}
