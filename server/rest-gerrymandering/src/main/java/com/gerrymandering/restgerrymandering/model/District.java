package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Districts")
public class District {

    @Id
    @GeneratedValue
    private Long id;

    private double populationEquality;

    private double polsbyPopper;

    private boolean majorityMinority;

    private String path;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private List<Election> elections;

    @OneToMany(mappedBy = "district")
    private Set<Precinct> precincts;

    @OneToMany(mappedBy = "district")
    private Set<CensusBlock> censusBlocks;
}
