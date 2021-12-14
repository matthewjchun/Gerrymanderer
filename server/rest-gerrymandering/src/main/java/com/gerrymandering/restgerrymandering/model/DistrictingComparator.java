package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import java.util.Comparator;

public class DistrictingComparator implements Comparator<Districting> {
    private final Constants.SortCriteria sortCriteria;
    private final Constants.PopulationType type;

    public DistrictingComparator(Constants.SortCriteria sortCriteria, Constants.PopulationType type) {
        this.sortCriteria = sortCriteria;
        this.type = type;
    }

    @Override
    public int compare(Districting o1, Districting o2) {
        double value1 = o1.getPopulationEqualityTotal();
        double value2 = o2.getPopulationEqualityTotal();
        switch (sortCriteria) {
            case POPEQ:
                if (type == Constants.PopulationType.VAP) {
                    value1 = o1.getPopulationEqualityVAP();
                    value2 = o2.getPopulationEqualityVAP();
                }
                else if (type == Constants.PopulationType.CVAP) {
                    value1 = o1.getPopulationEqualityCVAP();
                    value2 = o1.getPopulationEqualityCVAP();
                }
            case POLSBYPOPPER:
                value1 = o1.getAvgPolsbyPopper();
                value2 = o2.getAvgPolsbyPopper();
            case OBJECTIVEFUNCTION:
                value1 = o1.getObjectiveValue();
                value2 = o2.getObjectiveValue();
        }
        return Double.compare(value2, value1);
    }
}
