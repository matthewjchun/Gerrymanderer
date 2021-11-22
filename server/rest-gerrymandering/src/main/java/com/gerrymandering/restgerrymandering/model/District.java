package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Districts")
public class District {

    @Id
    @GeneratedValue
    private long id;

    private double polsbyPopper;

    private boolean majorityMinority;

    private String path;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private List<Election> elections;

    @OneToMany(mappedBy = "district")
    private Set<Precinct> precincts;
    
    @OneToMany(mappedBy = "district")
    private Set<CensusBlock> censusBlocks;



    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }

    public double getPolsbyPopper() { return polsbyPopper; }

    public void setPolsbyPopper(double polsbyPopper) { this.polsbyPopper = polsbyPopper; }

    public boolean getMajorityMinority() { return majorityMinority; }

    // public District(Long id, Population population, double polsbyPopper, boolean majorityMinority, Set<Precinct> precincts,
    //                 List<CensusBlock> censusBlocks, String path){
    //     this.id = id;
    //     this.populations = population;
    //     this.polsbyPopper = polsbyPopper;
    //     this.majorityMinority = majorityMinority;
    //     this.precincts = precincts;
    //     this.censusBlocks = censusBlocks;
    //     this.path = path;
    // }

    public District clone() {
        // Long id = this.getId();
        // Population pop = this.getPopulation();
        // double polsby = this.getPolsbyPopper();
        // boolean majMin = this.getMajorityMinority();
        // List<Precinct> precs = this.getPrecincts();
        // List<CensusBlock> blocks = this.getCensusBlocks();
        // String path = this.getPath();

        return null;
    }

    public CensusBlock getRandomBorderCB(){
        List<CensusBlock> borderBlocks = new ArrayList<CensusBlock>();
        for (CensusBlock block : censusBlocks){
            if (block.isBorderCB()){
                borderBlocks.add(block);
            }
        }
        int size = borderBlocks.size();
        int index = (int) ((Math.random() * (size)));
        return borderBlocks.get(index);
    }

    public boolean moveCB(CensusBlock censusBlock, District destDistrict){
        try{
            destDistrict.getCensusBlocks().add(censusBlock);
            this.getCensusBlocks().remove(censusBlock);
        }
        catch (Exception e){
            return  false;
        }
        return true;
    }

    public void addCensusBlock(CensusBlock censusBlock) {
        this.getCensusBlocks().add(censusBlock);
    }

    public void removeCensusBlock(CensusBlock censusBlock) {
        this.getCensusBlocks().remove(censusBlock);
    }

    public void calculatePopulation() {
        // STUB
    }

    public void calculatePolsbyPopper() {
        // STUB
    }

    public void calculateMajorityMinorty() {
        // STUB
    }

    public int countSplitPrecincts() {
        // STUB
        return 0;
    }

    public int calculatePopDifference(District smallestDistrict){
        // will be called on the largest district in a districting
        Population smallestDistrictPop = smallestDistrict.getPopulation();

        int smallestPopulation = smallestDistrictPop.getPopulationValue();
        int largestPopulation = this.getPopulation().getPopulationValue();

        int popDifference = largestPopulation - smallestPopulation;

        return popDifference;
    }
}
