package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Measures")
public class Measures {



    private double populationEquality;

    @OneToMany
    private List<Double> polsbyPopper;

    private int majorityMinorityCount;

    public double getPopulationEquality() {
        return populationEquality;
    }

    public void setPopulationEquality(double populationEquality) {
        this.populationEquality = populationEquality;
    }

    public List<Double> getPolsbyPopper() {
        return polsbyPopper;
    }

    public void setPolsbyPopper(List<Double> polsbyPopper) {
        this.polsbyPopper = polsbyPopper;
    }

    public int getMajorityMinorityCount() {
        return majorityMinorityCount;
    }

    public void setMajorityMinorityCount(int majorityMinorityCount) {
        this.majorityMinorityCount = majorityMinorityCount;
    }
}
