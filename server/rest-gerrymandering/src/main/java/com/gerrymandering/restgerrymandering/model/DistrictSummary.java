package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;

public class DistrictSummary {

    private long districtId;

    //private Population population;

    private double republican;

    private double democratic;

    private String election;

    public long getId() { return districtId; }

    public void setId(long districtId) { this.districtId = districtId; }

    /*public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }*/

    public double getRepublican() { return republican; }

    public void setRepublican(double republican) { this.republican = republican; }

    public double getDemocratic() { return democratic; }

    public void setDemocratic(double democratic) { this.democratic = democratic; }

    public String getElection() { return election; }

    public void setElection(String election) { this.election = election; }
}
