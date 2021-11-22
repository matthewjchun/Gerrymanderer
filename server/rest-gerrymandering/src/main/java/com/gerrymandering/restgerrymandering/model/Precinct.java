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
    private List<Election> elections;

    @ManyToOne
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private District district;

    @ManyToMany
    @JoinTable(name = "NeighboringPrecincts", joinColumns = {
            @JoinColumn(name = "primaryPrecinctId", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "neighborPrecinctId", referencedColumnName = "id")})
    private Set<Precinct> neighbors;

    public Precinct() {}

    public Precinct(Long id, String path, List<Population> populations, List<Election> elections, District district,
                    Set<Precinct> neighbors) {
        this.id = id;
        this.path = path;
        this.populations = populations;
        this.elections = elections;
        this.district = district;
        this.neighbors = neighbors;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new Precinct(id, path, populations, elections, district, neighbors);
        }
    }

    // GETTERS AND SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
}