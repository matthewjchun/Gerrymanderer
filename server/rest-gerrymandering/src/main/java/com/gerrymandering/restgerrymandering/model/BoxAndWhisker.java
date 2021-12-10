package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
@Table(name = "BoxWhiskers")
public class BoxAndWhisker {

    @Id
    private long id;

    @Enumerated(EnumType.STRING)
    private Constants.Demographic basis;

    @Column(name = "minimum")
    private double min;

    @Column(name = "maximum")
    private double max;

    private double firstQuartile;

    private double median;

    private double thirdQuartile;
}
