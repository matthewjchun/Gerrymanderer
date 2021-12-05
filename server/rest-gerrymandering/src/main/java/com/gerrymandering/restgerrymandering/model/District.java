package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.vividsolutions.jts.geom.Geometry;
import org.geotools.geojson.geom.GeometryJSON;

import javax.persistence.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Districts")
public class District implements Cloneable {

    @Id
    @GeneratedValue
    private long id;

    private double polsbyPopper;

    private boolean majorityMinorityTotal;

    private boolean majorityMinorityVAP;

    private boolean majorityMinorityCVAP;

    private String path;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    @OrderBy("populationType")
    private List<Population> populations;

    @OneToMany
    @JoinColumn(name = "districtId", referencedColumnName = "id")
    @OrderBy("name")
    private List<Election> elections;

    @OneToMany(mappedBy = "district")
    private Set<Precinct> precincts;

    @OneToMany(mappedBy = "district")
    @OrderBy("id")
    private Set<CensusBlock> censusBlocks;

    public District() {
    }

    public District(long id, double polsbyPopper, boolean majorityMinorityTotal, boolean majorityMinorityVAP,
            boolean majorityMinorityCVAP, String path, List<Population> populations, List<Election> elections,
            Set<Precinct> precincts, Set<CensusBlock> censusBlocks) {
        this.id = id;
        this.polsbyPopper = polsbyPopper;
        this.majorityMinorityTotal = majorityMinorityTotal;
        this.majorityMinorityVAP = majorityMinorityVAP;
        this.majorityMinorityCVAP = majorityMinorityCVAP;
        this.path = path;
        this.populations = populations;
        this.elections = elections;
        this.precincts = precincts;
        this.censusBlocks = censusBlocks;
    }

    @Override
    public Object clone() {
        District district;
        try {
            district = (District) super.clone();
        } catch (CloneNotSupportedException e) {
            district = new District(id, polsbyPopper, majorityMinorityTotal, majorityMinorityVAP, majorityMinorityCVAP,
                    path, populations, elections, precincts, censusBlocks);
        }
        List<Population> populationsClone = new ArrayList<>();
        for (Population population : populations) {
            populationsClone.add((Population) population.clone());
        }
        district.setPopulations(populationsClone);
        List<Election> electionsClone = new ArrayList<>();
        for (Election election : elections) {
            electionsClone.add((Election) election.clone());
        }
        district.setElections(electionsClone);
        Set<Precinct> precinctsClone = new HashSet<>();
        for (Precinct precinct : precincts) {
            precinctsClone.add((Precinct) precinct.clone());
        }
        district.setPrecincts(precinctsClone);
        Set<CensusBlock> censusBlocksClone = new HashSet<>();
        for (CensusBlock censusBlock : censusBlocks) {
            censusBlocksClone.add((CensusBlock) censusBlock.clone());
        }
        district.setCensusBlocks(censusBlocksClone);
        return district;
    }

    public Population getPopulationByType(Constants.PopulationType type) {
        return populations.get(type.ordinal());
    }

    public CensusBlock selectBorderCB() {
        List<CensusBlock> borderCensusBlocks = new ArrayList<>();
        for (CensusBlock cb : censusBlocks) {
            if (cb.isBorder())
                borderCensusBlocks.add(cb);
        }
        int size = borderCensusBlocks.size();
        int index = (int) ((Math.random() * (size)));
        return borderCensusBlocks.get(index);
    }

    public boolean moveCB(CensusBlock selectedCB, District destDistrict, List<District> removed, List<District> added,
                          List<CensusBlock> moved) {
        try {
            moved.add(selectedCB);
            censusBlocks.remove(selectedCB);
            removed.add(this);
            System.out.println("Source population: " + populations.get(0).getTotal());
            calculatePopulation(selectedCB, false);
            //calculateElection(selectedCB, false);
            System.out.println("Source population: " + populations.get(0).getTotal());
            destDistrict.getCensusBlocks().add(selectedCB);
            added.add(destDistrict);
            System.out.println("Dest population: " + destDistrict.getPopulations().get(0).getTotal());
            destDistrict.calculatePopulation(selectedCB, true);
            //calculateElection(selectedCB, true);
            System.out.println("Dest population: " + destDistrict.getPopulations().get(0).getTotal());
            selectedCB.setDistrict(destDistrict);
        } catch (Exception e) {
            System.out.println("moveCB ERROR!");
            return false;
        }
        return true;
    }

    public void calculatePopulation(CensusBlock cb, boolean add) {
        for (int i = 0; i < populations.size(); i++) {
            Population population = populations.get(i);
            Population cbPopulation = cb.getPopulations().get(i);
            if (add) {
                population.setTotal(population.getTotal() + cbPopulation.getTotal());
                population.setAfrican(population.getAfrican() + cbPopulation.getAfrican());
                population.setWhite(population.getWhite() + cbPopulation.getWhite());
                population.setAsian(population.getAsian() + cbPopulation.getAsian());
                population.setHispanic(population.getHispanic() + cbPopulation.getHispanic());
                population.setNativeAmerican(population.getNativeAmerican() + cbPopulation.getNativeAmerican());
                population.setPacificIslander(population.getPacificIslander() + cbPopulation.getPacificIslander());
            }
            else {
                population.setTotal(population.getTotal() - cbPopulation.getTotal());
                population.setAfrican(population.getAfrican() - cbPopulation.getAfrican());
                population.setWhite(population.getWhite() - cbPopulation.getWhite());
                population.setAsian(population.getAsian() - cbPopulation.getAsian());
                population.setHispanic(population.getHispanic() - cbPopulation.getHispanic());
                population.setNativeAmerican(population.getNativeAmerican() - cbPopulation.getNativeAmerican());
                population.setPacificIslander(population.getPacificIslander() - cbPopulation.getPacificIslander());
            }
        }
    }

    public void calculateElection(CensusBlock cb, boolean add) {
        for (int i = 0; i < elections.size(); i++) {
            Election election = elections.get(i);
            Election cbElection = cb.getElections().get(i);
            if (add) {
                election.setDemocratic(election.getDemocratic() + cbElection.getDemocratic());
                election.setRepublican(election.getRepublican() + cbElection.getRepublican());
            }
            else {
                election.setDemocratic(election.getDemocratic() - cbElection.getDemocratic());
                election.setRepublican(election.getRepublican() - cbElection.getRepublican());
            }
        }
    }

    public void calculatePolsbyPopper() {
        GeometryJSON geometryJSON = new GeometryJSON();
        try {
            Geometry geometry = geometryJSON.read(Constants.getResourcePath() + path);
            double area = geometry.getArea();
            double perimeter = geometry.getLength();
            setPolsbyPopper((4 * Math.PI * area) / Math.pow(perimeter, 2));
        } catch (IOException e) {
            System.out.println("Error reading district geoJSON.");
        }
    }

    public void calculateMajorityMinorty() {
        // STUB
    }

    public int countSplitPrecincts() {
        // STUB
        return 0;
    }

    public int calculatePopulationDifference(District smallestDistrict, Constants.PopulationType type) {
        // will be called on the largest district in a districting
        Population smallestDistrictPop = smallestDistrict.getPopulationByType(type);
        Population largestDistrictPop = getPopulationByType(type);
        int smallestPopValue = smallestDistrictPop.getTotal();
        int largestPopValue = largestDistrictPop.getTotal();
        return Math.abs(smallestPopValue - largestPopValue);
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

    public boolean isMajorityMinorityTotal() {
        return majorityMinorityTotal;
    }

    public void setMajorityMinorityTotal(boolean majorityMinorityTotal) {
        this.majorityMinorityTotal = majorityMinorityTotal;
    }

    public boolean isMajorityMinorityVAP() {
        return majorityMinorityVAP;
    }

    public void setMajorityMinorityVAP(boolean majorityMinorityVAP) {
        this.majorityMinorityVAP = majorityMinorityVAP;
    }

    public boolean isMajorityMinorityCVAP() {
        return majorityMinorityCVAP;
    }

    public void setMajorityMinorityCVAP(boolean majorityMinorityCVAP) {
        this.majorityMinorityCVAP = majorityMinorityCVAP;
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
