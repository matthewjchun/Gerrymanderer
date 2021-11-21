package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

public class DistrictingSummary {

    private Long id;

    private State state;

    private double populationEquality;

    //private List<Double> polsbyPopper;

    private int majorityMinorityCount;


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public double getPopulationEquality() { return populationEquality; }

    public void setPopulationEquality(double populationEquality) {
        this.populationEquality = populationEquality;
    }

    /*public List<Double> getPolsbyPopper() { return polsbyPopper; }

    public void setPolsbyPopper(List<Double> polsbyPopper) { this.polsbyPopper = polsbyPopper; }*/

    public int getMajorityMinorityCount() { return majorityMinorityCount; }

    public void setMajorityMinorityCount(int majorityMinorityCount) {
        this.majorityMinorityCount = majorityMinorityCount;
    }

}
