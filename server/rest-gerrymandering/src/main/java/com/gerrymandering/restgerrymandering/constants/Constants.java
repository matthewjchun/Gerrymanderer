package com.gerrymandering.restgerrymandering.constants;

import java.util.HashMap;
import java.util.Map;

public class Constants {
    private static final String[] states;
    private static final Map<String, Integer> districtingOffsets;
    static {
        states = new String[] {"az", "mi", "va"};
        districtingOffsets = new HashMap<>();
        districtingOffsets.put("az", 0);
        districtingOffsets.put("mi", 31);
        districtingOffsets.put("va", 62);
    }
    private static final int enactedDistrictingIndex = 0;
    private static final String resourcePath = "src/main/resources/data/";
    private static final int maxIterations = 300;
    private static final int estimatedTimePerIteration = 1;
    private static final int maxFailedAttempts = 100;
    private static final double minThresholdMajorityMinority = 0.5;

    public enum PopulationType {
        TOTAL,
        VAP,
        CVAP
    }

    public enum Demographic {
        AFRICAN,
        ASIAN,
        HISPANIC,
        WHITE,
        NATIVE,
        PACIFICISLANDER,
        DEMOCRATIC,
        REPUBLICAN
    }

    public enum ElectionName {
        PRE20
    }

    public enum SortCriteria {
        OBJECTIVEFUNCTION,
        POPEQ,
        POLSBYPOPPER
    }

    public static String[] getStates() {
        return states;
    }

    public static Map<String, Integer> getDistrictingOffsets() {
        return districtingOffsets;
    }

    public static int getEnactedDistrictingIndex() {
        return enactedDistrictingIndex;
    }

    public static String getResourcePath() {
        return resourcePath;
    }

    public static int getMaxIterations() {
        return maxIterations;
    }

    public static int getEstimatedTimePerIteration() {
        return estimatedTimePerIteration;
    }

    public static int getMaxFailedAttempts() {
        return maxFailedAttempts;
    }

    public static double getMinThresholdMajorityMinority() {
        return minThresholdMajorityMinority;
    }
}