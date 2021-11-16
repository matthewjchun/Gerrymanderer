package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;

@Entity
public class Population {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

}
