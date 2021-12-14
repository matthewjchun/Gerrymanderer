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

    @Enumerated(EnumType.ORDINAL)
    private Constants.PopulationType populationType;

    @Column(name = "minimum")
    private double min;

    @Column(name = "maximum")
    private double max;

    private double firstQuartile;

    private double median;

    private double thirdQuartile;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Constants.Demographic getBasis() {
        return basis;
    }

    public void setBasis(Constants.Demographic basis) {
        this.basis = basis;
    }

    public Constants.PopulationType getPopulationType() {
        return populationType;
    }

    public void setPopulationType(Constants.PopulationType populationType) {
        this.populationType = populationType;
    }

    public double getMin() {
        return min;
    }

    public void setMin(double min) {
        this.min = min;
    }

    public double getMax() {
        return max;
    }

    public void setMax(double max) {
        this.max = max;
    }

    public double getFirstQuartile() {
        return firstQuartile;
    }

    public void setFirstQuartile(double firstQuartile) {
        this.firstQuartile = firstQuartile;
    }

    public double getMedian() {
        return median;
    }

    public void setMedian(double median) {
        this.median = median;
    }

    public double getThirdQuartile() {
        return thirdQuartile;
    }

    public void setThirdQuartile(double thirdQuartile) {
        this.thirdQuartile = thirdQuartile;
    }
}
