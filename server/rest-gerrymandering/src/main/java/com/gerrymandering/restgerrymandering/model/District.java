package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Districts")
public class District {

    @Id
    @GeneratedValue
    private Long id;

    private Population population;

    private double polsbyPopper;

    private boolean majorityMinority;

    //private List<Precinct> precincts;

    //private List<CensusBlock> censusBlocks;

    private String path;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }

    public double getPolsbyPopper() { return polsbyPopper; }

    public void setPolsbyPopper(double polsbyPopper) { this.polsbyPopper = polsbyPopper; }

    public boolean getMajorityMinority() { return majorityMinority; }

    public void setMajorityMinority(boolean majorityMinority) { this.majorityMinority = majorityMinority; }

    //public List<Precinct> getPrecincts() { return precincts; }

    //public void setPrecincts(List<Precinct> precincts) { this.precincts = precincts; }

//    public List<CensusBlock> getCensusBlocks() { return censusBlocks; }
//
//    public void setCensusBlocks(List<CensusBlock>) { this.censusBlocks = censusBlocks; }

    public String getPath() { return path; }

    public void setPath(String path) { this.path = path;}

}
