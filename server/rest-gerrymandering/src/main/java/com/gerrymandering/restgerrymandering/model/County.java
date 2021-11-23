package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Counties")
public class County {

    @Id
    @GeneratedValue
    private Long id;

    private String path;

    @OneToMany
    @JoinColumn(name = "countyId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "countyId", referencedColumnName = "id")
    private List<Election> elections;

    @OneToMany
    @JoinColumn(name = "countyId", referencedColumnName = "id")
    private Set<Precinct> precincts;
}
