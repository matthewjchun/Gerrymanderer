package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Precinct")
public class Precinct {


    @Id
    @GeneratedValue
    private Long id;

    /*private Population population;

    private List<Precinct> neighbors;*/

    private String path;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    /*public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }

    public List<Precinct> getNeighbors() { return neighbors; }

    public void setNeighbors(List<Precinct> neighbors) { this.neighbors = neighbors; }*/

    public String getPath() { return path; }

    public void setPath(String path) { this.path = path; }
}
