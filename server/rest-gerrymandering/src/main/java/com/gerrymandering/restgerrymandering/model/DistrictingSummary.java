package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "DistrictingSummary")
public class DistrictingSummary {

    @Id
    @GeneratedValue
    private Long id;

    private String stateName;

    private double populationEquality;

    private List<Double> polsbyPopper;

    private int majorityMinorityCount;


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getStateName() { return stateName; }

    public void setStateName(String stateName) { this.stateName = stateName; }

    public double getPopulationEquality() { return populationEquality; }

    public void setPopulationEquality(double populationEquality) {
        this.populationEquality = populationEquality;
    }

    public List<Double> getPolsbyPopper() { return polsbyPopper; }

    public void setPolsbyPopper(List<Double> polsbyPopper) { this.polsbyPopper = polsbyPopper; }

    public int getMajorityMinorityCount() { return majorityMinorityCount; }

    public void setMajorityMinorityCount(int majorityMinorityCount) {
        this.majorityMinorityCount = majorityMinorityCount;
    }

}
