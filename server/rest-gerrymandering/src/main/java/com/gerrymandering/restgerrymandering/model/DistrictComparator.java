package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import java.util.Comparator;

public class DistrictComparator implements Comparator<District> {
    private final Constants.PopulationType type;

    public DistrictComparator(Constants.PopulationType type) {
        this.type = type;
    }

    @Override
    public int compare(District o1, District o2) {
        Population population1 = o1.getPopulationByType(type);
        Population population2 = o2.getPopulationByType(type);
        int population1Value = population1.getTotal();
        int population2Value = population2.getTotal();
        return Integer.compare(population2Value, population1Value);
    }
}
