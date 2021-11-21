package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
public class Population {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private Constants.PopulationType populationType;

    private Constants.Demographic demographic;

    private int[] population;

    private String election;

    // getters n setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int[] getPopulation() {
        return population;
    }

    public void setPopulation(int[] population) {
        this.population = population;
    }



    //

    public int getPopulationValue() {
        int sum = 0;
        for(int val : population){
            sum += val;
        }
        return sum;
    }


}
