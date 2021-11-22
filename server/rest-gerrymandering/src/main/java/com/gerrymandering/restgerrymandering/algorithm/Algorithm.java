package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.model.Districting;

import java.util.List;

public class Algorithm {

    private AlgorithmSummary algoSummary;

    private Districting currentDistricting;

    private double currentPopEq;

    private double currentAvgPolsbyPopper;

    private int currentMajorityMinorityCount;

    private boolean isRunning;

    private int moveAttempts;

    private int numberIterations;

    private int maxIterations;

    private double popEqualityThresh;

    private double polsbyPopperThresh;

    private int majorityMinorityThresh;

    private boolean terminationFlag;

    public Algorithm()

    // GETTERS AND SETTERS

    public AlgorithmSummary getAlgoSummary(){
        return algoSummary;
    }

    public void setAlgoSummary(AlgorithmSummary algoSummary) {
        this.algoSummary = algoSummary;
    }

    public Districting getCurrentDistricting() {
        return currentDistricting;
    }

    public void setCurrentDistricting(Districting currentDistricting) {
        this.currentDistricting = currentDistricting;
    }

    public void setCurrentDistricting(Districting districting, Measures measures){
        this.setCurrentDistricting(districting);
        this.setCurrentDistrictingMeasures(measures);
    }

    public Measures getCurrentDistrictingMeasures() {
        return currentDistrictingMeasures;
    }

    public void setCurrentDistrictingMeasures(Measures currentDistrictingMeasures) {
        this.currentDistrictingMeasures = currentDistrictingMeasures;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }

    public int getMoveAttempts() {
        return moveAttempts;
    }

    public void setMoveAttempts(int moveAttempts) {
        this.moveAttempts = moveAttempts;
    }

    public int getNumberIterations() {
        return numberIterations;
    }

    public void setNumberIterations(int numberIterations) {
        this.numberIterations = numberIterations;
    }

    public int getMaxIterations() {
        return maxIterations;
    }

    public void setMaxIterations(int maxIterations) {
        this.maxIterations = maxIterations;
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

    public void setThresholds(double popEqualityThresh, double polsbyPopperThresh, int majorityMinorityThresh){
        this.popEqualityThresh = popEqualityThresh;
        this.polsbyPopperThresh = polsbyPopperThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public AlgorithmSummary start(Districting selectedDistricting, double popEqualityThresh, double polsbyPopperThresh,
                                  int majorityMinorityThresh){
        //STUB
        return algoSummary;
    }

    public void pause(int time){
        //STUB
    }
}