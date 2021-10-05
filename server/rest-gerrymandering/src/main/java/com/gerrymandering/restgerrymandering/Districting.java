package com.gerrymandering.restgerrymandering;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Districting")
public class Districting {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "STATE_NAME", length = 50, nullable = false, unique = true)
    private String state;

    /*@Column(name = "COORDINATES")
    @OneToMany
    private int[] coordinates;

    @Column(name = "PROPERTIES")
    private Object properties;*/

    public Districting() {

    }

    public Districting(String state) {
        this.state = state;
        /*this.coordinates = coordinates;
        this.properties = properties;*/
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    /*public int[][][] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(int[][][] coordinates) {
        this.coordinates = coordinates;
    }

    public Object getProperties() {
        return properties;
    }

    public void setProperties(Object properties) {
        this.properties = properties;
    }*/
}
