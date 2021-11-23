package com.gerrymandering.restgerrymandering.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class StateSummary {

    private String name;
    private double centerLon;
    private double centerLat;
    private List<Population> populations;
    private List<Election> elections;
    private List<DistrictingSummary> districtingSummaries;

    public StateSummary() {}

    public StateSummary(String name, double centerLon, double centerLat, List<Population> populations,
                        List<Election> elections, List<DistrictingSummary> districtingSummaries) {
        this.name = name;
        this.centerLon = centerLon;
        this.centerLat = centerLat;
        this.populations = populations;
        this.elections = elections;
        this.districtingSummaries = districtingSummaries;
    }

    public void populateSummary(State state) {
        name = state.getName();
        centerLon = state.getCenterLon();
        centerLat = state.getCenterLat();
        populations = state.getPopulations();
        elections = state.getElections();
        List<DistrictingSummary> summaryList = new ArrayList<>();
        for (Districting districting: state.getDistrictings()) {
            DistrictingSummary summary = new DistrictingSummary();
            summary.populateSummary(districting);
            summaryList.add(summary);
        }
        districtingSummaries = summaryList;
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

    public List<DistrictingSummary> getDistrictingSummaries() {
        return districtingSummaries;
    }

    public void setDistrictingSummaries(List<DistrictingSummary> districtingSummaries) {
        this.districtingSummaries = districtingSummaries;
    }
}
