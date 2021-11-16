package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "County")
public class County {

    @Id
    @GeneratedValue
    private Long id;

    private String boundariesPath;

    private Population population;

    private String path;

    public String getBoundariesPath() { return this.boundariesPath; }

    public void setBoundariesPath(String newBoundariesPath) { this.boundariesPath = newBoundariesPath; }

    public Population getPopulation() { return this.population; }

    public void setPopulation(Population newPop) { this.population = newPop; }

    public String getPath() { return this.path; }

    public void setPath(String newPath) { this.path = newPath; }
}
