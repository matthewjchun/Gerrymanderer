package com.gerrymandering.restgerrymandering.controller;

import com.gerrymandering.restgerrymandering.algorithm.Algorithm;
import com.gerrymandering.restgerrymandering.algorithm.AlgorithmSummary;
import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.Districting;
import com.gerrymandering.restgerrymandering.model.State;
import com.gerrymandering.restgerrymandering.model.StateSummary;
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
        for (String state: Constants.getStates()) {
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
    public ResponseEntity<JsonObject> getStateFull(@RequestParam String state, HttpServletRequest request) {
        HttpSession session = request.getSession();
        JsonObject stateFull = new JsonObject();
        Gson gson = new Gson();

        State stateObj = ss.getStateByName(state);
        //currentState = stateObj;
        session.setAttribute("currentState", stateObj);

        Districting enactedDistricting = stateObj.getEnactedDistricting();
        String districtPath = enactedDistricting.getDistrictPath();
        String precinctPath = enactedDistricting.getPrecinctPath();
        String countyPath = enactedDistricting.getCountyPath();
        String[] paths = {districtPath, precinctPath, countyPath};
        for (String path : paths) {
            try (FileReader reader = new FileReader(Constants.getResourcePath() + path)) {
                JsonObject geoJson = JsonParser.parseReader(reader).getAsJsonObject();
                stateFull.add(path, geoJson);
            } catch (Exception e) {
                System.out.println("Error");
                System.out.println(path);
            }
        }

        StateSummary summaryObj = new StateSummary();
        summaryObj.populateSummary(stateObj);
        String summaryStr = gson.toJson(summaryObj);
        JsonObject summary = JsonParser.parseString(summaryStr).getAsJsonObject();
        stateFull.add("summary", summary);
        return ResponseEntity.ok(stateFull);
    }

    @PostMapping("/populationType")
    public ResponseEntity<String> setPopulationType(@RequestBody JsonObject populationTypeJson, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String populationTypeStr = populationTypeJson.get("populationType").getAsString().toUpperCase();
        Constants.PopulationType populationType = Constants.PopulationType.valueOf(populationTypeStr);
        session.setAttribute("populationType", populationType);
        return ResponseEntity.ok("{\"populationType\": \"" + populationType + "\"}");
    }

    @GetMapping("/algorithm")
    public ResponseEntity<JsonObject> startAlgorithm(@RequestParam(name = "id") long districtingId,
                                                     @RequestParam(name = "popEqThresh") double popEqualityThresh,
                                                     @RequestParam double polsbyPopperThresh,
                                                     @RequestParam int majorityMinorityThresh,
                                                     HttpServletRequest request) {
        HttpSession session = request.getSession();
        State currentState = (State) session.getAttribute("currentState");
        Constants.PopulationType populationType = (Constants.PopulationType) session.getAttribute("populationType");
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
            algorithm = new Algorithm(algoSummary, populationType, selectedDistricting, 0,
                    popEqualityThresh, polsbyPopperThresh, majorityMinorityThresh, false);
        }
        else {
            AlgorithmSummary algoSummary = algorithm.getAlgoSummary();
            algoSummary.setRunning(true);
            algorithm.setTerminationFlag(false);
        }
        algorithm.start(popEqualityThresh, polsbyPopperThresh, majorityMinorityThresh);
        session.setAttribute("algorithm", algorithm);
        return null;
    }

    @GetMapping("/algorithmSummary")
    public ResponseEntity<AlgorithmSummary> getAlgorithmSummary(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Algorithm algorithm = (Algorithm) session.getAttribute("algorithm");
        return ResponseEntity.ok(algorithm.getAlgoSummary());
    }
}