package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "Districtings")
public class Districting {

    @Id
    @GeneratedValue
    private long id;

    private double populationEquality;

    private double avgPolsbyPopper;

    private int majorityMinorityCount;

    private String districtPath;

    private String precinctPath;

    private String countyPath;

    @OneToMany
    @JoinColumn(name = "districtingId", referencedColumnName = "id")
    private List<District> districts;

    @Transient
    private double populationEqualityThreshold;

    @Transient
    private double polsbyPopperThreshold;

    @Transient
    private int majorityMinorityThreshold;

    @Transient
    private int splitPrecincts;

    @Transient
    private List<DistrictingSummary> districtingSummaries;

    public void sortDistricts() {
        //Collections.sort(districts);
    }
}
