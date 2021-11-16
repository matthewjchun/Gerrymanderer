package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;

@Entity
@Table(name = "DistrictSummary")
public class DistrictSummary {

    @Id
    @GeneratedValue
    private Long id;

    private Population population;

    private double republican;

    private double democratic;

    private String election;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }

    public double getRepublican() { return republican; }

    public void setRepublican(double republican) { this.republican = republican; }

    public double getDemocratic() { return democratic; }

    public void setDemocratic(double democratic) { this.democratic = democratic; }

    public String getElection() { return election; }

    public void setElection(String election) { this.election = election; }
}
