package com.gerrymandering.restgerrymandering.controller;

import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.Districting;
import com.gerrymandering.restgerrymandering.model.State;
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

//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/")
public class DistrictingController {

    private State currentState;
    private Constants.PopulationType populationType;
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

        State stateObj = ss.getStateByName(state);
        //currentState = stateObj;
        session.setAttribute("currentState", stateObj.getName());
        //System.out.println("State Name: " + stateObj.getName());

        return ResponseEntity.ok(null);

        /*JsonObject stateFull = new JsonObject();
        Districting enactedDistricting = stateObj.getEnactedDistricting();
        String districtPath = enactedDistricting.getDistrictPath();
        String precinctPath = enactedDistricting.getPrecinctPath();
        String countyPath = enactedDistricting.getCountyPath();
        String[] paths = {districtPath, precinctPath, countyPath};
        for (String path : paths) {
            try (FileReader reader = new FileReader(path)) {
                JsonObject geoJson = JsonParser.parseReader(reader).getAsJsonObject();
                stateFull.add(path, geoJson);
            } catch (Exception e) {
                System.out.println("Error");
            }
        }
        Gson gson = new Gson();
        String summaryStr = gson.toJson(state);
        JsonObject summary = JsonParser.parseString(summaryStr).getAsJsonObject();
        stateFull.add("summary", summary);
        return ResponseEntity.ok(stateFull);*/
    }

    @PostMapping("/populationType")
    public ResponseEntity<String> setPopulationType(@RequestBody JsonObject populationTypeJson, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String populationTypeNum = populationTypeJson.get("populationType").getAsString().toUpperCase();
        populationType = Constants.PopulationType.valueOf(populationTypeNum);
        session.setAttribute("populationType", populationType);
        return ResponseEntity.ok("populationTypeNum");
    }
}