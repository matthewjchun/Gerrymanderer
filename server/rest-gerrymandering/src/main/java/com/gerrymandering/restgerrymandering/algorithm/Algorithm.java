package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.CensusBlock;
import com.gerrymandering.restgerrymandering.model.District;
import com.gerrymandering.restgerrymandering.model.Districting;
import org.springframework.scheduling.annotation.Async;

import java.util.List;

public class Algorithm {

    private AlgorithmSummary algoSummary;
    private Constants.PopulationType populationType;
    private Districting currentDistricting;
    private int failedAttempts;
    private double popEqualityThresh;
    //private double polsbyPopperThresh;
    private int majorityMinorityThresh;
    private boolean terminationFlag;
    private List<District> removed;
    private List<District> added;
    private List<CensusBlock> moved;

    public Algorithm(AlgorithmSummary algoSummary, Constants.PopulationType populationType,
                     Districting currentDistricting, int failedAttempts, double popEqualityThresh,
                     int majorityMinorityThresh, boolean terminationFlag, List<District> removed,
                     List<District> added, List<CensusBlock> moved) {
        this.algoSummary = algoSummary;
        this.populationType = populationType;
        this.currentDistricting = currentDistricting;
        this.failedAttempts = failedAttempts;
        this.popEqualityThresh = popEqualityThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
        this.terminationFlag = terminationFlag;
        this.removed = removed;
        this.added = added;
        this.moved = moved;
    }

    public void setThresholds(double popEqualityThresh, /*double polsbyPopperThresh, */int majorityMinorityThresh) {
        this.popEqualityThresh = popEqualityThresh;
        //this.polsbyPopperThresh = polsbyPopperThresh;
        this.majorityMinorityThresh = majorityMinorityThresh;
    }

    public static boolean validThresholds(double popEqualityThresh, int majorityMinorityThresh) {
        return popEqualityThresh >= 0 && popEqualityThresh <= 1 && majorityMinorityThresh >= 0;
    }

    @Async
    public void start(double popEqualityThresh,/* double polsbyPopperThresh,*/ int majorityMinorityThresh) {
        currentDistricting.calculatePopulationEquality();
        while (algoSummary.getNumberIterations() < Constants.getMaxIterations() &&
                failedAttempts < Constants.getMaxFailedAttempts() && algoSummary.isRunning()) {
            System.out.println("Iteration #" + algoSummary.getNumberIterations());
            Districting selectedDistricting = (Districting) currentDistricting.clone();
            boolean failure = false;
            boolean moveSuccess = selectedDistricting.moveCBFromLargestToSmallestDistrict(selectedDistricting, populationType, removed, added, moved);
            if (!moveSuccess) {
                failure = true;
            } else {
                System.out.println("Move success");
                selectedDistricting.calculatePopulationEquality();
                if (!selectedDistricting.isImproved(currentDistricting, populationType)) {
                    failure = true;
                } else {
                    System.out.println("Improved");
                    //Geometry geometry = selectedDistricting.calculateDistrictingBoundary();
                    //selectedDistricting.calculateAvgPolsbyPopper();
                    selectedDistricting.calculateMajorityMinorityCount();
                    if (!selectedDistricting.validateThresholds(popEqualityThresh, /*polsbyPopperThresh, */majorityMinorityThresh, populationType)) {
                        failure = true;
                    } else {
                        System.out.println("Valid");
                        setFailedAttempts(0);
                        setCurrentDistricting(selectedDistricting);
                        algoSummary.updateMeasures(currentDistricting);
                        System.out.println("Population Equality: " + selectedDistricting.getPopulationEqualityTotal());
                    }
                }
            }
            if (failure) {
                setFailedAttempts(failedAttempts + 1);
                removed.remove(removed.size()-1);
                added.remove(added.size()-1);
                moved.remove(moved.size()-1);
            }
            algoSummary.setNumberIterations(algoSummary.getNumberIterations() + 1);
            algoSummary.setEstimatedTime((Constants.getMaxIterations() - algoSummary.getNumberIterations()) * Constants.getEstimatedTimePerIteration());
        }
        algoSummary.setRunning(false);
        //algoSummary.setDistrictingBoundary(currentDistricting.calculateDistrictingBoundary(removed, added, moved));
    }

    public void pause(int time) {
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

    public boolean isTerminationFlag() {
        return terminationFlag;
    }

    public void setTerminationFlag(boolean terminationFlag) {
        this.terminationFlag = terminationFlag;
    }

    public List<District> getRemoved() {
        return removed;
    }

    public void setRemoved(List<District> removed) {
        this.removed = removed;
    }

    public List<District> getAdded() {
        return added;
    }

    public void setAdded(List<District> added) {
        this.added = added;
    }

    public List<CensusBlock> getMoved() {
        return moved;
    }

    public void setMoved(List<CensusBlock> moved) {
        this.moved = moved;
    }
}