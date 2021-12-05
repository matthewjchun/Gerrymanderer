package com.gerrymandering.restgerrymandering.controller;

import com.gerrymandering.restgerrymandering.algorithm.Algorithm;
import com.gerrymandering.restgerrymandering.algorithm.AlgorithmSummary;
import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.*;
import com.gerrymandering.restgerrymandering.services.*;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/")
public class DistrictingController {

    private StateService ss;
    private DistrictingService dgs;
    private DistrictService ds;
    private PrecinctService ps;

    @Autowired
    public DistrictingController(StateService ss, DistrictingService dgs, DistrictService ds, PrecinctService ps) {
        this.ss = ss;
        this.dgs = dgs;
        this.ds = ds;
        this.ps = ps;
    }

    @GetMapping("/stateOutlines")
    public ResponseEntity<JsonObject> getStateOutlines() {
        JsonObject outlines = new JsonObject();
        try (FileReader reader = new FileReader(Constants.getResourcePath() + "states/state-outlines.json")) {
            outlines.add("stateOutlines", JsonParser.parseReader(reader).getAsJsonObject());
        } catch (Exception e) {
            System.out.println("Error");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        for (String state : Constants.getStates()) {
            try (FileReader reader = new FileReader(Constants.getResourcePath() + "states/" + state + ".json")) {
                outlines.add(state, JsonParser.parseReader(reader).getAsJsonObject());
            } catch (Exception e) {
                System.out.println("Error");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return ResponseEntity.ok(outlines);
    }

    @GetMapping("/stateFull")
    public ResponseEntity<JsonObject> getStateFull(@RequestParam(name = "state") String stateName, HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("currentStateName", stateName);
        JsonObject stateFull = new JsonObject();
        Gson gson = new Gson();
        State state = ss.getStateByName(stateName);

        Districting enactedDistricting = state.getEnactedDistricting();
        String districtPath = enactedDistricting.getDistrictPath();
        String precinctPath = enactedDistricting.getPrecinctPath();
        String countyPath = enactedDistricting.getCountyPath();
        String[] paths = { districtPath, precinctPath, countyPath };
        for (String path : paths) {
            try (FileReader reader = new FileReader(Constants.getResourcePath() + path)) {
                JsonObject geoJson = JsonParser.parseReader(reader).getAsJsonObject();
                stateFull.add(path.split("/")[0], geoJson);
            } catch (Exception e) {
                System.out.println("Error");
                System.out.println(path);
            }
        }

        StateSummary summaryObj = new StateSummary();
        summaryObj.populateSummary(state);
        String summaryStr = gson.toJson(summaryObj);
        JsonObject summary = JsonParser.parseString(summaryStr).getAsJsonObject();
        stateFull.add("summary", summary);
        return ResponseEntity.ok(stateFull);
    }

    @PostMapping("/populationType")
    public ResponseEntity<String> setPopulationType(@RequestBody JsonObject populationTypeJson,
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        String populationTypeStr = populationTypeJson.get("populationType").getAsString().toUpperCase();
        Constants.PopulationType populationType = Constants.PopulationType.valueOf(populationTypeStr);
        session.setAttribute("populationType", populationType);
        return ResponseEntity.ok("{\"populationType\": \"" + populationType + "\"}");
    }

    @GetMapping("/algorithm")
    public ResponseEntity<JsonObject> startAlgorithm(@RequestParam(name = "id") long districtingId,
            @RequestParam(name = "popEqThresh") double popEqualityThresh, @RequestParam double polsbyPopperThresh,
            @RequestParam int majorityMinorityThresh, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String currentStateName = (String) session.getAttribute("currentStateName");
        State currentState = ss.getStateByName(currentStateName);
        Constants.PopulationType populationType = (Constants.PopulationType) session.getAttribute("populationType");
        if (populationType == null) {
            populationType = Constants.PopulationType.TOTAL;
            session.setAttribute("populationType", populationType);
        }
        Gson gson = new Gson();
        Districting selectedDistricting = currentState.getSeaWulfDistricting(districtingId);

        Algorithm algorithm = (Algorithm) session.getAttribute("algorithm");
        if (algorithm == null) {
            AlgorithmSummary algoSummary = new AlgorithmSummary(0,
                    Constants.getMaxIterations() * Constants.getEstimatedTimePerIteration(), true,
                    currentState.getName(), selectedDistricting.getPopulationEqualityTotal(),
                    selectedDistricting.getPopulationEqualityVAP(), selectedDistricting.getPopulationEqualityCVAP(),
                    selectedDistricting.getAvgPolsbyPopper(), selectedDistricting.getMajorityMinorityCountTotal(),
                    selectedDistricting.getMajorityMinorityCountVAP(),
                    selectedDistricting.getMajorityMinorityCountCVAP(), new ArrayList<>(), null);
            algorithm = new Algorithm(algoSummary, populationType, selectedDistricting, 0, popEqualityThresh,
                    majorityMinorityThresh, false);
        } else {
            AlgorithmSummary algoSummary = algorithm.getAlgoSummary();
            algoSummary.setRunning(true);
            algorithm.setTerminationFlag(false);
            algorithm.setThresholds(popEqualityThresh, majorityMinorityThresh);
        }
        boolean validThresh = Algorithm.validThresholds(popEqualityThresh, majorityMinorityThresh);
        if (!validThresh)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        algorithm.start(popEqualityThresh, majorityMinorityThresh);
        session.setAttribute("algorithm", algorithm);
        JsonObject algoSummaryJson = JsonParser.parseString(gson.toJson(algorithm.getAlgoSummary())).getAsJsonObject();
        return ResponseEntity.ok(algoSummaryJson);
    }

    @GetMapping("/algorithmSummary")
    public ResponseEntity<AlgorithmSummary> getAlgorithmSummary(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Algorithm algorithm = (Algorithm) session.getAttribute("algorithm");
        return ResponseEntity.ok(algorithm.getAlgoSummary());
    }

    // TESTING METHODS
    public void printNumNeighbors(State state) {
        Set<CensusBlock> set = state.getEnactedDistricting().getDistricts().get(0).getCensusBlocks();
        System.out.println("# census blocks: " + set.size());
        int sum = 0;
        for (CensusBlock cb: set) {
            Set<CensusBlock> neighbors = cb.getNeighbors();
            /*for (CensusBlock neighbor: neighbors) {
                System.out.println(neighbor.getId());
            }*/
            System.out.println("Census Block " + cb.getId() + ": " + neighbors.size());
            sum += neighbors.size();
        }
    }

    public void printTotalNeighborCount(State state) {
        List<District> districts = state.getEnactedDistricting().getDistricts();
        int sum = 0;
        for (District district: districts) {
            Set<CensusBlock> censusBlocks = district.getCensusBlocks();
            for (CensusBlock cb: censusBlocks) {
                Set<CensusBlock> neighbors = cb.getNeighbors();
                sum += neighbors.size();
            }
        }
        System.out.println("Total Neighbor Count: " + sum);
    }

    public void printDistrictingMeasures(Districting districting) {
        System.out.println(districting.getId());
        System.out.println(districting.getPopulationEqualityTotal());
        System.out.println(districting.getPopulationEqualityVAP());
        System.out.println(districting.getPopulationEqualityCVAP());
        System.out.println(districting.getAvgPolsbyPopper());
        System.out.println(districting.getMajorityMinorityCountTotal());
        System.out.println(districting.getMajorityMinorityCountVAP());
        System.out.println(districting.getMajorityMinorityCountCVAP());
    }
}