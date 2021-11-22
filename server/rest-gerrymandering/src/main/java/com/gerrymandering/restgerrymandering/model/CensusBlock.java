package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "CensusBlocks")

public class CensusBlock implements Cloneable{

    @Id
    @GeneratedValue
    private long id;

    private boolean borderCB;

    private String path;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    private List<Election> elections;

    @ManyToMany
    @JoinTable(name = "NeighboringCBs", joinColumns = {
            @JoinColumn(name = "primaryCBId", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "neighborCBId", referencedColumnName = "id")})
    private Set<CensusBlock> neighbors;

    @ManyToOne
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "precinctId", referencedColumnName = "id")
    private Precinct precinct;

    public CensusBlock() {}

    public CensusBlock(long id, Boolean borderCB, String path, List<Population> populations, List<Election> elections,
                       Set<CensusBlock> neighbors, District district, Precinct precinct) {
        this.id = id;
        this.borderCB = borderCB;
        this.path = path;
        this.populations = populations;
        this.elections = elections;
        this.neighbors = neighbors;
        this.district = district;
        this.precinct = precinct;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new CensusBlock(id, borderCB, path, populations, elections, neighbors, district, precinct);
        }
    }

    public List<CensusBlock> getNeighborCBInDiffDistrict() {
        // check through list of neighbors, check if diff district
        District original = this.getDistrict();
        List<CensusBlock> neighborCBInDiffDistrict = new ArrayList<CensusBlock>();
        for (CensusBlock neigh : neighbors){
            if (neigh.getDistrict() != original){
                neighborCBInDiffDistrict.add(neigh);
            }
        }
        return neighborCBInDiffDistrict;
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isBorderCB() {
        return borderCB;
    }

    public void setBorderCB(boolean borderCB) {
        this.borderCB = borderCB;
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

    public Set<CensusBlock> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(Set<CensusBlock> neighbors) {
        this.neighbors = neighbors;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Precinct getPrecinct() {
        return precinct;
    }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }
}
