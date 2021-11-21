package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "States")
public class State {

    @Id
    private String name;

    private double centerLon;

    private double centerLat;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<Election> elections;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<Districting> districtings;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private Set<County> counties;

    @OneToMany
    @JoinColumn(name = "stateName", referencedColumnName = "name")
    private List<BoxAndWhisker> boxAndWhiskerData;

    @Transient
    private int selectedDistrictingId;

    @Transient
    private List<DistrictingSummary> districtingSummaries;


    public Districting getEnactedDistricting() {
        return districtings.get(Constants.getEnactedDistrictingIndex() +
                Constants.getDistrictingOffsets().get(name.toLowerCase()));
    }
}
