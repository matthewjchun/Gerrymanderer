package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
@Table(name = "Populations")
public class Population {

    @Id
    @GeneratedValue
    private long id;

    private int total;

    private int african;

    private int white;

    private int asian;

    private int hispanic;

    @Column(name = "native")
    private int nativeAmerican;

    private int pacificIslander;

    @Enumerated(EnumType.ORDINAL)
    private Constants.PopulationType populationType;
}
