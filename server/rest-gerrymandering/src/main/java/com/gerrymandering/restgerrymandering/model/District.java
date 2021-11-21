package com.gerrymandering.restgerrymandering.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Districts")
public class District {

    @Id
    @GeneratedValue
    private Long id;

    private Population population;

    private double polsbyPopper;

    private boolean majorityMinority;

    private List<Precinct> precincts;

    private List<CensusBlock> censusBlocks;

    private String path;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Population getPopulation() { return population; }

    public void setPopulation(Population population) { this.population = population; }

    public double getPolsbyPopper() { return polsbyPopper; }

    public void setPolsbyPopper(double polsbyPopper) { this.polsbyPopper = polsbyPopper; }

    public boolean getMajorityMinority() { return majorityMinority; }

    public void setMajorityMinority(boolean majorityMinority) { this.majorityMinority = majorityMinority; }

    public List<Precinct> getPrecincts() { return precincts; }

    public void setPrecincts(List<Precinct> precincts) { this.precincts = precincts; }

    public List<CensusBlock> getCensusBlocks() { return censusBlocks; }

    public void setCensusBlocks(List<CensusBlock> censusBlocks) { this.censusBlocks = censusBlocks; }

    public String getPath() { return path; }

    public void setPath(String path) { this.path = path;}

    public District(Long id, Population population, double polsbyPopper, boolean majorityMinority, List<Precinct> precincts,
                    List<CensusBlock> censusBlocks, String path){
        this.id = id;
        this.population = population;
        this.polsbyPopper = polsbyPopper;
        this.majorityMinority = majorityMinority;
        this.precincts = precincts;
        this.censusBlocks = censusBlocks;
        this.path = path;
    }

    public District clone() {
        Long id = this.getId();
        Population pop = this.getPopulation();
        double polsby = this.getPolsbyPopper();
        boolean majMin = this.getMajorityMinority();
        List<Precinct> precs = this.getPrecincts();
        List<CensusBlock> blocks = this.getCensusBlocks();
        String path = this.getPath();

        return new District(id, pop, polsby, majMin, precs, blocks, path);
    }

    public CensusBlock getRandomBorderCB(){
        List<CensusBlock> borderBlocks = new ArrayList<CensusBlock>();
        for (CensusBlock block : censusBlocks){
            if (block.isBorderCensusBlock()){
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
        this.getPopulation().getPopulationValue();
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
