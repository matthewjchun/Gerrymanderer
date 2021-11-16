package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import Constants;

@Entity
public class Population {

    public Population(){



    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private enum type {
        TOTAL,
        VAP,
        CVAP,
    };

    private enum demographic {
        AFRICAN,
        ASIAN,
        HISPANIC,
        WHITE,
        NATIVE,
        DEMOCRATIC,
        REPUBLICAN,
    };

    private int[] population;

    private String election;
}
