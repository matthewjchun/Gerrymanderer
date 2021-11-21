package com.gerrymandering.restgerrymandering.constants;

import java.util.HashMap;
import java.util.Map;

public class Constants {
    private static final Map<String, Integer> stateMapper;
    private static final Map<String, Integer> districtingOffsets;
    static {
        stateMapper = new HashMap<>();
        stateMapper.put("az", 0);
        stateMapper.put("mi", 1);
        stateMapper.put("va", 2);

        districtingOffsets = new HashMap<>();
        districtingOffsets.put("az", 0);
        districtingOffsets.put("mi", 31);
        districtingOffsets.put("va", 62);
    }

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
    }

    public enum ElectionName {
        SEN18,
        AG18,
    }

    private static final int enactedDistrictingIndex = 0;

    public static Map<String, Integer> getStateMapper() {
        return stateMapper;
    }

    public static Map<String, Integer> getDistrictingOffsets() {
        return districtingOffsets;
    }

    public static int getEnactedDistrictingIndex() {
        return enactedDistrictingIndex;
    }
}