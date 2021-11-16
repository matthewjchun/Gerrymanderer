package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "State")
public class State {

    @Id
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "population_id", referencedColumnName = "id")
    private Population population;

    @OneToMany(mappedBy = "districting")
    private List<Districting> districtings;

    private double centerLon;

    private double centerLat;

    @Transient
    private int selectedDistrictingId;

    public Districting getEnactedDistricting() {
        return districtings.get(Constants.getEnactedDistrictingIndex() + Constants.getDistrictingOffsets().get(name.toLowerCase()));
    }
}
