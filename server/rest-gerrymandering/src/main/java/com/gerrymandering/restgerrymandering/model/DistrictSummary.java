package com.gerrymandering.restgerrymandering.model;

public class DistrictSummary {

    private long districtId;

    private Election election;

    public long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(long districtId) {
        this.districtId = districtId;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }
}
