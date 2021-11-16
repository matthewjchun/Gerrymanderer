package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "StateName")
    private State state;

//    private List<Districts> districts;

    @JoinColumn(name = "District")
    private Measures measures;

    private double populationEqualityThreshold;

    private double polsbyPopperThreshold;

    private int majorityMinorityThreshold;

    private int splitPrecincts;

    private List<DistrictSummary> districtSummaries;

    private String districtPath;

    private String precinctPath;

    private String countyPath;


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public State getState() { return state; }

    public void setState(State state) { this.state = state; }



    public String getDistrictPath() { return districtPath; }

    public void setDistrictPath(String districtPath) {
        this.districtPath = districtPath;
    }

    public String getPrecinctPath() {
        return precinctPath;
    }

    public void setPrecinctPath(String precinctPath) {
        this.precinctPath = precinctPath;
    }

    public String getCountyPath() {
        return countyPath;
    }

    public void setCountyPath(String countyPath) {
        this.countyPath = countyPath;
    }
}
