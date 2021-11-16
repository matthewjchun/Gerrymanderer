package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;

@Entity
public class Population {
//- type:PopulationType
//- demographic:Demographic
//- population:int[]
//- election:enum

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

}
