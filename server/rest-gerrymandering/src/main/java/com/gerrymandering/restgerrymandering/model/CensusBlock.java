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

    @Column(name = "isBorder")
    private boolean border;

    private String path;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "censusBlockId", referencedColumnName = "id")
    @OrderBy("name")
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

    public CensusBlock(long id, boolean border, String path, List<Population> populations, List<Election> elections,
                       Set<CensusBlock> neighbors, District district, Precinct precinct) {
        this.id = id;
        this.border = border;
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
            return new CensusBlock(id, border, path, populations, elections, neighbors, district, precinct);
        }
    }

    public List<CensusBlock> getNeighborCBInDiffDistrict() {
        // check through list of neighbors, check if diff district
        District original = this.getDistrict();
        List<CensusBlock> neighborCBInDiffDistrict = new ArrayList<>();
        for (CensusBlock neighbor : neighbors){
            District neighborDistrict = neighbor.getDistrict();
            if (original.getId() != neighborDistrict.getId()){
                neighborCBInDiffDistrict.add(neighbor);
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

    public boolean isBorder() {
        return border;
    }

    public void setBorder(boolean border) {
        this.border = border;
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
