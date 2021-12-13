package com.gerrymandering.restgerrymandering.algorithm;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.CensusBlock;
import com.gerrymandering.restgerrymandering.model.District;
import com.gerrymandering.restgerrymandering.model.Districting;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlgorithmService {

    @Async
    public void start(AlgorithmSettings settings, double popEqualityThresh, int majorityMinorityThresh) {
        Districting currentDistricting = settings.getCurrentDistricting();
        AlgorithmSummary algoSummary = settings.getAlgoSummary();
        int failedAttempts = settings.getFailedAttempts();
        List<Long> removed = settings.getRemoved();
        List<Long> added = settings.getAdded();
        List<CensusBlock> moved = settings.getMoved();
        Constants.PopulationType populationType = settings.getPopulationType();

        currentDistricting.calculatePopulationEquality();
        while (algoSummary.getNumberIterations() < Constants.getMaxIterations() &&
                failedAttempts < Constants.getMaxFailedAttempts() && algoSummary.isRunning()) {
            System.out.println("Iteration #" + algoSummary.getNumberIterations());
            currentDistricting = settings.getCurrentDistricting();
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
                    selectedDistricting.calculateMajorityMinorityCount();
                    if (!selectedDistricting.validateThresholds(popEqualityThresh, majorityMinorityThresh, populationType)) {
                        failure = true;
                    } else {
                        System.out.println("Valid");
                        settings.setFailedAttempts(0);
                        settings.setCurrentDistricting(selectedDistricting);
                        algoSummary.updateMeasures(selectedDistricting);
                        algoSummary.updateDistrictPopulations(selectedDistricting, populationType);
                        System.out.println("Population Equality: " + selectedDistricting.getPopulationEqualityTotal());
                    }
                }
            }
            if (failure) {
                settings.setFailedAttempts(failedAttempts + 1);
                if (removed.size() > 0)
                    removed.remove(removed.size()-1);
                if (added.size() > 0)
                    added.remove(added.size()-1);
                if (moved.size() > 0)
                    moved.remove(moved.size()-1);
            }
            algoSummary.setNumberIterations(algoSummary.getNumberIterations() + 1);
            algoSummary.setEstimatedTime((Constants.getMaxIterations() - algoSummary.getNumberIterations()) * Constants.getEstimatedTimePerIteration());
        }
        algoSummary.setRunning(false);
        algoSummary.setDistrictingBoundary(currentDistricting.calculateDistrictingBoundaryTest(removed, added, moved));
    }
}
