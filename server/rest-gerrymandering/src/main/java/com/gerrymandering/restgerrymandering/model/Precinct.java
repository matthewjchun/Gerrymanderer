package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Precincts")
public class Precinct {

    @Id
    @GeneratedValue
    private Long id;

    private String path;

    @OneToMany
    @JoinColumn(name = "precinctId", referencedColumnName = "id")
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
}
