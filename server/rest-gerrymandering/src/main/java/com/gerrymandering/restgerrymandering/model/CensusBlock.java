package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
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

    public CensusBlock clone() {
        return null;
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

    public District getDistrict() {
        return district;
    }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }

    // public String getBoundariesPath() {
    //     return boundariesPath;
    // }

    // public void setBoundariesPath(String boundariesPath) {
    //     this.boundariesPath = boundariesPath;
    // }

    // public List<CensusBlock> getNeighbors() {
    //     return neighbors;
    // }

    // public void setNeighbors(List<CensusBlock> neighbors) {
    //     this.neighbors = neighbors;
    // }

     public Boolean isBorderCB() {
         return isBorderCB;
     }

    // public void setIsBorderCensusBlock(Boolean borderCensusBlock) {
    //     isBorderCensusBlock = borderCensusBlock;
    // }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

}
