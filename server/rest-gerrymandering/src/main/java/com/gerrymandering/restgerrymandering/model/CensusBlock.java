package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "CensusBlocks")
public class CensusBlock {

    @Id
    @GeneratedValue
    private Long id;

    private Boolean isBorderCB;

    private String path;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    private List<Election> elections;

    @JoinTable(name = "NeighboringCBs", joinColumns = {
            @JoinColumn(name = "primaryCBId", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "neighborCBId", referencedColumnName = "id")})
    @ManyToMany
    private Set<Precinct> neighbors;

    @ManyToOne
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "precinctId", referencedColumnName = "id")
    private Precinct precinct;
}