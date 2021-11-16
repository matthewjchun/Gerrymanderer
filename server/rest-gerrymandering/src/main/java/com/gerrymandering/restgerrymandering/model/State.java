package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "State")
public class State {

    public State(){
        name = "Arizona";

    }

    @Id
    @Column(name = "name")
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

    private List<DistrictingSummary> districtingSummaries;

    // will need to add constants for some of these temp "magic numbers" for indexing
    public Districting getEnactedDistricting() {
        if (name.equalsIgnoreCase("az"))
            return districtings.get(0);
        if (name.equalsIgnoreCase("mi"))
            return districtings.get(31);
        if (name.equalsIgnoreCase("va"))
            return districtings.get(62);
        return null;
    }



}
