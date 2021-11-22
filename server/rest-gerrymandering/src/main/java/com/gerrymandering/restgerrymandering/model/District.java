package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Districts")
public class District implements Cloneable{

    @Id
    @GeneratedValue
    private long id;

    private double polsbyPopper;

    private boolean majorityMinority;

    private String path;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    private List<Election> elections;

    @OneToMany(mappedBy = "district")
    private Set<Precinct> precincts;
    
    @OneToMany(mappedBy = "district")
    private Set<CensusBlock> censusBlocks;

    public District() {}

    public District(long id, double polsbyPopper, boolean majorityMinority, String path, List<Population> populations,
                    List<Election> elections, Set<Precinct> precincts, Set<CensusBlock> censusBlocks) {
        this.id = id;
        this.polsbyPopper = polsbyPopper;
        this.majorityMinority = majorityMinority;
        this.path = path;
        this.populations = populations;
        this.elections = elections;
        this.precincts = precincts;
        this.censusBlocks = censusBlocks;
    }

    @Override
    public Object clone() {
        District district = null;
        try {
            district = (District) super.clone();
        }
        catch (CloneNotSupportedException e) {
            district = new District(id, polsbyPopper, majorityMinority, path, populations, elections, precincts,
                    censusBlocks);
        }
        List<Population> populationsClone = new ArrayList<>();
        for (Population population: populations) {
            populationsClone.add((Population) population.clone());
        }
        district.setPopulations(populationsClone);
        List<Election> electionsClone = new ArrayList<>();
        for (Election election: elections) {
            electionsClone.add((Election) election.clone());
        }
        district.setElections(electionsClone);
        Set<Precinct> precinctsClone = new HashSet<>();
        for (Precinct precinct: precincts) {
            precinctsClone.add((Precinct) precinct.clone());
        }
        district.setPrecincts(precinctsClone);
        Set<CensusBlock> censusBlocksClone = new HashSet<>();
        for (CensusBlock censusBlock: censusBlocks) {
            censusBlocksClone.add((CensusBlock) censusBlock.clone());
        }
        district.setCensusBlocks(censusBlocksClone);
        return district;
    }

    public Population getPopulationByType(Constants.PopulationType type) {
        return populations.get(type.ordinal());
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

    public int calculatePopDifference(District smallestDistrict, Constants.PopulationType type){
        // will be called on the largest district in a districting
        Population smallestDistrictPop = smallestDistrict.getPopulationByType(type);

        int smallestPopulation = smallestDistrictPop.getPopulationValue();
        int largestPopulation = this.getPopulation().getPopulationValue();

        int popDifference = largestPopulation - smallestPopulation;

        return popDifference;
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPolsbyPopper() {
        return polsbyPopper;
    }

    public void setPolsbyPopper(double polsbyPopper) {
        this.polsbyPopper = polsbyPopper;
    }

    public boolean isMajorityMinority() {
        return majorityMinority;
    }

    public void setMajorityMinority(boolean majorityMinority) {
        this.majorityMinority = majorityMinority;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<Population> getPopulations() {
        return populations;
    }

    public void setPopulations(List<Population> populations) {
        this.populations = populations;
    }

    public List<Election> getElections() {
        return elections;
    }

    public void setElections(List<Election> elections) {
        this.elections = elections;
    }

    public Set<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(Set<Precinct> precincts) {
        this.precincts = precincts;
    }

    public Set<CensusBlock> getCensusBlocks() {
        return censusBlocks;
    }

    public void setCensusBlocks(Set<CensusBlock> censusBlocks) {
        this.censusBlocks = censusBlocks;
    }
}
