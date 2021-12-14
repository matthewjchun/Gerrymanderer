package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

public class StateSummary {

    private String name;
    private double centerLon;
    private double centerLat;
    private List<Population> populations;
    private List<Election> elections;
    private List<BoxAndWhisker> african;
    private List<BoxAndWhisker> asian;
    private List<BoxAndWhisker> hispanic;
    private List<BoxAndWhisker> nativeAmerican;
    private List<BoxAndWhisker> pacificIslander;
    private List<BoxAndWhisker> democratic;
    private List<BoxAndWhisker> republican;
    private List<DistrictingSummary> districtingSummaries;

    public StateSummary() {}

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
        setAfrican(new ArrayList<>());
        setAsian(new ArrayList<>());
        setHispanic(new ArrayList<>());
        setNativeAmerican(new ArrayList<>());
        setPacificIslander(new ArrayList<>());
        setDemocratic(new ArrayList<>());
        setRepublican(new ArrayList<>());
        for (BoxAndWhisker boxAndWhisker: state.getBoxAndWhiskerData()) {
            Constants.Demographic basis = boxAndWhisker.getBasis();
            switch (basis) {
                case AFRICAN:
                    african.add(boxAndWhisker);
                case ASIAN:
                    asian.add(boxAndWhisker);
                case HISPANIC:
                    hispanic.add(boxAndWhisker);
                case NATIVE:
                    nativeAmerican.add(boxAndWhisker);
                case PACIFICISLANDER:
                    pacificIslander.add(boxAndWhisker);
                case DEMOCRATIC:
                    democratic.add(boxAndWhisker)\                 case REPUBLICAN:
                    republican.add(boxAndWhisker);
            }
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

    public List<BoxAndWhisker> getAfrican() {
        return african;
    }

    public void setAfrican(List<BoxAndWhisker> african) {
        this.african = african;
    }

    public List<BoxAndWhisker> getAsian() {
        return asian;
    }

    public void setAsian(List<BoxAndWhisker> asian) {
        this.asian = asian;
    }

    public List<BoxAndWhisker> getHispanic() {
        return hispanic;
    }

    public void setHispanic(List<BoxAndWhisker> hispanic) {
        this.hispanic = hispanic;
    }

    public List<BoxAndWhisker> getNativeAmerican() {
        return nativeAmerican;
    }

    public void setNativeAmerican(List<BoxAndWhisker> nativeAmerican) {
        this.nativeAmerican = nativeAmerican;
    }

    public List<BoxAndWhisker> getPacificIslander() {
        return pacificIslander;
    }

    public void setPacificIslander(List<BoxAndWhisker> pacificIslander) {
        this.pacificIslander = pacificIslander;
    }

    public List<BoxAndWhisker> getDemocratic() {
        return democratic;
    }

    public void setDemocratic(List<BoxAndWhisker> democratic) {
        this.democratic = democratic;
    }

    public List<BoxAndWhisker> getRepublican() {
        return republican;
    }

    public void setRepublican(List<BoxAndWhisker> republican) {
        this.republican = republican;
    }

    public List<DistrictingSummary> getDistrictingSummaries() {
        return districtingSummaries;
    }

    public void setDistrictingSummaries(List<DistrictingSummary> districtingSummaries) {
        this.districtingSummaries = districtingSummaries;
    }
}
