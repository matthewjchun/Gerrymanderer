package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.Districting;

public class Algorithm {

    private AlgorithmSummary algoSummary;

    private Constants.PopulationType populationType;

    private Districting currentDistricting;

    private int failedAttempts;

    private int numberIterations;

    private double popEqualityThresh;

    private double polsbyPopperThresh;

    private int majorityMinorityThresh;

    private boolean terminationFlag;

    public Algorithm(AlgorithmSummary algoSummary, Constants.PopulationType populationType,
                     Districting currentDistricting, int failedAttempts,
                     int numberIterations, double popEqualityThresh, double polsbyPopperThresh,
                     int majorityMinorityThresh, boolean terminationFlag) {
        this.algoSummary = algoSummary;
        this.populationType = populationType;
        this.currentDistricting = currentDistricting;
        this.failedAttempts = failedAttempts;
        this.numberIterations = numberIterations;
        this.popEqualityThresh = popEqualityThresh;
        this.polsbyPopperThresh = polsbyPopperThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
        this.terminationFlag = terminationFlag;
    }

    public void setThresholds(double popEqualityThresh, double polsbyPopperThresh, int majorityMinorityThresh){
        this.popEqualityThresh = popEqualityThresh;
        this.polsbyPopperThresh = polsbyPopperThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public AlgorithmSummary start(Districting selectedDistricting, double popEqualityThresh, double polsbyPopperThresh,
                                  int majorityMinorityThresh){
        while (numberIterations < Constants.getMaxIterations() && algoSummary.isRunning()) {
            selectedDistricting.moveCBFromLargestToSmallestDistrict(selectedDistricting, populationType);
        }
        return algoSummary;
    }

    public void pause(int time){
        //STUB
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

    public int getNumberIterations() {
        return numberIterations;
    }

    public void setNumberIterations(int numberIterations) {
        this.numberIterations = numberIterations;
    }

    public double getPopEqualityThresh() {
        return popEqualityThresh;
    }

    public void setPopEqualityThresh(double popEqualityThresh) {
        this.popEqualityThresh = popEqualityThresh;
    }

    public double getPolsbyPopperThresh() {
        return polsbyPopperThresh;
    }

    public void setPolsbyPopperThresh(double polsbyPopperThresh) {
        this.polsbyPopperThresh = polsbyPopperThresh;
    }

    public int getMajorityMinorityThresh() {
        return majorityMinorityThresh;
    }

    public void setMajorityMinorityThresh(int majorityMinorityThresh) {
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public boolean isTerminationFlag() {
        return terminationFlag;
    }

    public void setTerminationFlag(boolean terminationFlag) {
        this.terminationFlag = terminationFlag;
    }
}