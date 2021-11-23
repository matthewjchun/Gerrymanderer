package com.gerrymandering.restgerrymandering.model;

import java.util.List;

public class DistrictSummary {

    private long districtId;
    private List<Population> populations;
    private List<Election> elections;

    public DistrictSummary() {}

    public void populateSummary(District district) {
        districtId = district.getId();
        populations = district.getPopulations();
        elections = district.getElections();
    }

    // GETTERS AND SETTERS
    public long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(long districtId) {
        this.districtId = districtId;
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
}
