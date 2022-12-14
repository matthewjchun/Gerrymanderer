package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.CensusBlock;
import com.gerrymandering.restgerrymandering.model.District;
import com.gerrymandering.restgerrymandering.model.Districting;

import java.util.List;

public class AlgorithmSettings {

    private AlgorithmSummary algoSummary;
    private Constants.PopulationType populationType;
    private Districting currentDistricting;
    private int failedAttempts;
    private double popEqualityThresh;
    private int majorityMinorityThresh;
    private List<Long> removed;
    private List<Long> added;
    private List<CensusBlock> moved;

    public AlgorithmSettings(AlgorithmSummary algoSummary, Constants.PopulationType populationType,
                             Districting currentDistricting, int failedAttempts, double popEqualityThresh,
                             int majorityMinorityThresh, List<Long> removed,
                             List<Long> added, List<CensusBlock> moved) {
        this.algoSummary = algoSummary;
        this.populationType = populationType;
        this.currentDistricting = currentDistricting;
        this.failedAttempts = failedAttempts;
        this.popEqualityThresh = popEqualityThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
        this.removed = removed;
        this.added = added;
        this.moved = moved;
    }

    public void setThresholds(double popEqualityThresh, int majorityMinorityThresh) {
        this.popEqualityThresh = popEqualityThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public static boolean validThresholds(double popEqualityThresh, int majorityMinorityThresh) {
        return popEqualityThresh >= 0 && popEqualityThresh <= 1 && majorityMinorityThresh >= 0;
    }

    // GETTERS AND SETTERS
    public AlgorithmSummary getAlgoSummary() {
        return algoSummary;
    }

    public void setAlgoSummary(AlgorithmSummary algoSummary) {
        this.algoSummary = algoSummary;
    }

    public Constants.PopulationType getPopulationType() {
        return populationType;
    }

    public void setPopulationType(Constants.PopulationType populationType) {
        this.populationType = populationType;
    }

    public Districting getCurrentDistricting() {
        return currentDistricting;
    }

    public void setCurrentDistricting(Districting currentDistricting) {
        this.currentDistricting = currentDistricting;
    }

    public int getFailedAttempts() {
        return failedAttempts;
    }

    public void setFailedAttempts(int failedAttempts) {
        this.failedAttempts = failedAttempts;
    }

    public double getPopEqualityThresh() {
        return popEqualityThresh;
    }

    public void setPopEqualityThresh(double popEqualityThresh) {
        this.popEqualityThresh = popEqualityThresh;
    }

    public int getMajorityMinorityThresh() {
        return majorityMinorityThresh;
    }

    public void setMajorityMinorityThresh(int majorityMinorityThresh) {
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public List<Long> getRemoved() {
        return removed;
    }

    public void setRemoved(List<Long> removed) {
        this.removed = removed;
    }

    public List<Long> getAdded() {
        return added;
    }

    public void setAdded(List<Long> added) {
        this.added = added;
    }

    public List<CensusBlock> getMoved() {
        return moved;
    }

    public void setMoved(List<CensusBlock> moved) {
        this.moved = moved;
    }
}