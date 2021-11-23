package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Precincts")
public class Precinct implements Cloneable {

    @Id
    @GeneratedValue
    private long id;

    private String path;

    @OneToMany
    @JoinColumn(name = "precinctId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "precinctId", referencedColumnName = "id")
    @OrderBy("name")
    private List<Election> elections;

    @ManyToOne
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private District district;

    @ManyToMany
    @JoinTable(name = "NeighboringPrecincts", joinColumns = {
            @JoinColumn(name = "primaryPrecinctId", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "neighborPrecinctId", referencedColumnName = "id")})
    private Set<Precinct> neighbors;

    @OneToMany(mappedBy = "precinct")
    private List<CensusBlock> censusBlocks;

    @Transient
    private List<District> splittingDistricts;

    public Precinct() {}

    public Precinct(long id, String path, List<Population> populations, List<Election> elections, District district,
                    Set<Precinct> neighbors, List<CensusBlock> censusBlocks, List<District> splittingDistricts) {
        this.id = id;
        this.path = path;
        this.populations = populations;
        this.elections = elections;
        this.district = district;
        this.neighbors = neighbors;
        this.censusBlocks = censusBlocks;
        this.splittingDistricts = splittingDistricts;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new Precinct(id, path, populations, elections, district, neighbors, censusBlocks, splittingDistricts);
        }
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<Population> getPopulations() {
        return populations;
    }

    public void setPopulations(List<Population> populations) {
        this.populations = populations;
    }

    public List<Election> getElections() {
        return elections;
    }

    public void setElections(List<Election> elections) {
        this.elections = elections;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Set<Precinct> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(Set<Precinct> neighbors) {
        this.neighbors = neighbors;
    }

    public List<CensusBlock> getCensusBlocks() {
        return censusBlocks;
    }

    public void setCensusBlocks(List<CensusBlock> censusBlocks) {
        this.censusBlocks = censusBlocks;
    }
}