package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "States")
public class State {

    public State(){
        name = "Arizona";

    }

    @Id
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private Population population;

    @OneToMany(mappedBy = "state")
    private List<Districting> districtings;

    @Column(name = "CenterLon")
    private double centerLon;

    @Column(name = "CenterLat")
    private double centerLat;

    @Transient
    private int selectedDistrictingId;

    //private List<DistrictingSummary> districtingSummaries;

    // will need to add constants for some of these temp "magic numbers" for indexing
    public Districting getEnactedDistricting() {
        return districtings.get(Constants.getEnactedDistrictingIndex() +
                Constants.getDistrictingOffsets().get(name.toLowerCase()));
    }



}
