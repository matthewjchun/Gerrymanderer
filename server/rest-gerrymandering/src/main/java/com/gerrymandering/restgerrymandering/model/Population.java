package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
@Table(name = "Populations")
public class Population implements Cloneable {

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

    public Population() {}

    public Population(long id, int total, int african, int white, int asian, int hispanic, int nativeAmerican,
                      int pacificIslander, Constants.PopulationType populationType) {
        this.id = id;
        this.total = total;
        this.african = african;
        this.white = white;
        this.asian = asian;
        this.hispanic = hispanic;
        this.nativeAmerican = nativeAmerican;
        this.pacificIslander = pacificIslander;
        this.populationType = populationType;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new Population(id, total, african, white, asian, hispanic, nativeAmerican, pacificIslander,
                    populationType);
        }
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getAfrican() {
        return african;
    }

    public void setAfrican(int african) {
        this.african = african;
    }

    public int getWhite() {
        return white;
    }

    public void setWhite(int white) {
        this.white = white;
    }

    public int getAsian() {
        return asian;
    }

    public void setAsian(int asian) {
        this.asian = asian;
    }

    public int getHispanic() {
        return hispanic;
    }

    public void setHispanic(int hispanic) {
        this.hispanic = hispanic;
    }

    public int getNativeAmerican() {
        return nativeAmerican;
    }

    public void setNativeAmerican(int nativeAmerican) {
        this.nativeAmerican = nativeAmerican;
    }

    public int getPacificIslander() {
        return pacificIslander;
    }

    public void setPacificIslander(int pacificIslander) {
        this.pacificIslander = pacificIslander;
    }

    public Constants.PopulationType getPopulationType() {
        return populationType;
    }

    public void setPopulationType(Constants.PopulationType populationType) {
        this.populationType = populationType;
    }
}
