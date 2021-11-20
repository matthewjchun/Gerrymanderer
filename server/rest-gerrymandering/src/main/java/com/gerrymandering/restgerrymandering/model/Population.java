package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
public class Population {

    @Id
    @GeneratedValue
    private long id;

    private int total;

    private int africanAmerican;

    private int white;

    private int asian;

    private int hispanic;

    private int nativeAmerican;

    private int pacificIslander;

    @Enumerated(EnumType.ORDINAL)
    private Constants.PopulationType populationType;

    @Enumerated(EnumType.STRING)
    private Constants.Election election;
}
