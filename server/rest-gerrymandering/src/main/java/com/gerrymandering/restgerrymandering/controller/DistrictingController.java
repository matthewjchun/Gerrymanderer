package com.gerrymandering.restgerrymandering.controller;

import com.gerrymandering.restgerrymandering.model.Districting;
import com.gerrymandering.restgerrymandering.model.State;
import com.gerrymandering.restgerrymandering.services.StateServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;

import static org.springframework.http.ResponseEntity.ok;

//@CrossOrigin("http://localhost:3000")
@RestController
//@RequestMapping("/districtings")
public class DistrictingController {

    private State currentState;
    private StateServiceImpl ss;

    @Autowired
    public DistrictingController(StateServiceImpl ss) {
        this.ss = ss;
    }

    @GetMapping("/stateOutlines")
    public ResponseEntity<JsonObject> getStateOutlines() {
        try (FileReader reader = new FileReader("/src/main/resources/data/states/state-outlines.json")) {
            return ResponseEntity.ok(JsonParser.parseReader(reader).getAsJsonObject());
        }
        catch (Exception e) {
            System.out.println("Error");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/stateFull")
    public ResponseEntity<JsonObject> getStateFull(@RequestParam String name) {
        State state = ss.getStateByName(name);
        currentState = state;

        JsonObject stateFull = new JsonObject();
        Districting enactedDistricting = state.getEnactedDistricting();
        String districtPath = enactedDistricting.getDistrictPath();
        String precinctPath = enactedDistricting.getPrecinctPath();
        String countyPath = enactedDistricting.getCountyPath();
        String[] paths = {districtPath, precinctPath, countyPath};

        for (String path: paths) {
            try (FileReader reader = new FileReader(path)) {
                JsonObject geoJson = JsonParser.parseReader(reader).getAsJsonObject();
                stateFull.add(path, geoJson);
            }
            catch (Exception e) {
                System.out.println("Error");
            }
        }

        Gson gson = new Gson();
        String summaryStr = gson.toJson(state);
        JsonObject summary = JsonParser.parseString(summaryStr).getAsJsonObject();
        stateFull.add("summary", summary);
        return ResponseEntity.ok(stateFull);
    }

    /*@PostMapping("/populationType")
    public ResponseEntity*/

}