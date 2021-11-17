package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "CensusBlock")
public class CensusBlock {

    @Id
    @GeneratedValue
    private Long id;

    private District district;

    private Precinct precinct;

    private String boundariesPath;

//    @OneToMany
    private List<CensusBlock> neighbors;

    private Boolean isBorderCensusBlock;

    private String path;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public District getDistrict() { return district; }

    public void setDistrict(District district) { this.district = district; }

    public Precinct getPrecinct() { return precinct; }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }

    public String getBoundariesPath() {
        return boundariesPath;
    }

    public void setBoundariesPath(String boundariesPath) {
        this.boundariesPath = boundariesPath;
    }

    public List<CensusBlock> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(List<CensusBlock> neighbors) {
        this.neighbors = neighbors;
    }

    public Boolean getBorderCensusBlock() {
        return isBorderCensusBlock;
    }

    public void setBorderCensusBlock(Boolean borderCensusBlock) {
        isBorderCensusBlock = borderCensusBlock;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
