package com.gerrymandering.restgerrymandering.controller;

import com.gerrymandering.restgerrymandering.algorithm.AlgorithmService;
import com.gerrymandering.restgerrymandering.algorithm.AlgorithmSettings;
import com.gerrymandering.restgerrymandering.algorithm.AlgorithmSummary;
import com.gerrymandering.restgerrymandering.constants.Constants;
import com.gerrymandering.restgerrymandering.model.*;
import com.gerrymandering.restgerrymandering.services.*;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.locationtech.jts.dissolve.LineDissolver;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryCollection;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.io.geojson.GeoJsonReader;
import org.locationtech.jts.io.geojson.GeoJsonWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.FileReader;
import java.io.StringReader;
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
    private AlgorithmService algorithmService;

    @Autowired
    public DistrictingController(StateService ss, DistrictingService dgs, DistrictService ds, PrecinctService ps, AlgorithmService algorithmService) {
        this.ss = ss;
        this.dgs = dgs;
        this.ds = ds;
        this.ps = ps;
        this.algorithmService = algorithmService;
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
            @RequestParam(name = "popEqThresh") double popEqualityThresh, @RequestParam int majorityMinorityThresh, HttpServletRequest request) {
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

        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        if (algorithmSettings == null) {
            AlgorithmSummary algoSummary = new AlgorithmSummary(0,
                    Constants.getMaxIterations() * Constants.getEstimatedTimePerIteration(), true,
                    false, currentState.getName(), selectedDistricting.getPopulationEqualityTotal(),
                    selectedDistricting.getPopulationEqualityVAP(), selectedDistricting.getPopulationEqualityCVAP(),
                    selectedDistricting.getAvgPolsbyPopper(), selectedDistricting.getMajorityMinorityCountTotal(),
                    selectedDistricting.getMajorityMinorityCountVAP(),
                    selectedDistricting.getMajorityMinorityCountCVAP(), new ArrayList<>(), null, new ArrayList<>());
            algorithmSettings = new AlgorithmSettings(algoSummary, populationType, selectedDistricting, 0, popEqualityThresh,
                    majorityMinorityThresh, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        } else {
            AlgorithmSummary algoSummary = algorithmSettings.getAlgoSummary();
            algoSummary.setRunning(true);
            algoSummary.setPaused(false);
            algorithmSettings.setThresholds(popEqualityThresh, majorityMinorityThresh);
        }
        boolean validThresh = AlgorithmSettings.validThresholds(popEqualityThresh, majorityMinorityThresh);
        if (!validThresh)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        session.setAttribute("algorithmSettings", algorithmSettings);
        JsonObject algoSummaryJson = JsonParser.parseString(gson.toJson(algorithmSettings.getAlgoSummary())).getAsJsonObject();
        algorithmService.start(algorithmSettings, popEqualityThresh, majorityMinorityThresh);
        return ResponseEntity.ok(algoSummaryJson);
    }

    @GetMapping("/algorithmSummary")
    public ResponseEntity<AlgorithmSummary> getAlgorithmSummary(HttpServletRequest request) {
        HttpSession session = request.getSession();
        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        return ResponseEntity.ok(algorithmSettings.getAlgoSummary());
    }

    @GetMapping("/pause")
    public ResponseEntity<AlgorithmSummary> pause(HttpServletRequest request) {
        HttpSession session = request.getSession();
        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        AlgorithmSummary algoSummary = algorithmSettings.getAlgoSummary();
        algoSummary.setRunning(false);
        algoSummary.setPaused(true);
        return ResponseEntity.ok(algoSummary);
    }

    @GetMapping("/resume")
    public ResponseEntity<AlgorithmSummary> resume(HttpServletRequest request) {
        HttpSession session = request.getSession();
        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        AlgorithmSummary algoSummary = algorithmSettings.getAlgoSummary();
        algoSummary.setRunning(true);
        algoSummary.setPaused(false);
        return ResponseEntity.ok(algoSummary);
    }

    @GetMapping("/stop")
    public ResponseEntity<AlgorithmSummary> stop(HttpServletRequest request) {
        HttpSession session = request.getSession();
        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        AlgorithmSummary algoSummary = algorithmSettings.getAlgoSummary();
        algoSummary.setRunning(false);
        algoSummary.setPaused(false);
        return ResponseEntity.ok(algoSummary);
    }

    @GetMapping("/reset")
    public ResponseEntity<JsonObject> reset(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("currentStateName", null);
        session.setAttribute("populationType", Constants.PopulationType.TOTAL);
        session.setAttribute("algorithmSettings", null);
        JsonObject success = new JsonObject();
        success.addProperty("success", true);
        return ResponseEntity.ok(success);
    }

    // TESTING METHODS
    @GetMapping("/boundary")
    public ResponseEntity<JsonObject> boundary(HttpServletRequest request) {
        HttpSession session = request.getSession();
        AlgorithmSettings algorithmSettings = (AlgorithmSettings) session.getAttribute("algorithmSettings");
        AlgorithmSummary algoSummary = algorithmSettings.getAlgoSummary();
        return ResponseEntity.ok(algoSummary.getDistrictingBoundary());
    }

    @GetMapping("/boundaryTest")
    public ResponseEntity<JsonObject> boundaryTest() {
        JsonObject featureCollection = new JsonObject();
        featureCollection.addProperty("type", "FeatureCollection");
        JsonArray features = new JsonArray();
        try (FileReader reader = new FileReader(Constants.getResourcePath() + "censusblocks/az_censusblock_0.json")) {
            JsonObject feature = JsonParser.parseReader(reader).getAsJsonObject();
            features.add(feature);
        } catch (Exception e) {
            System.out.println("Error");
        }
        featureCollection.add("features", features);
        return ResponseEntity.ok(featureCollection);
    }

    @GetMapping("/jtsTest")
    public ResponseEntity<JsonObject> jts() {
        GeometryFactory gf = new GeometryFactory();
        GeoJsonReader geoReader = new GeoJsonReader();
        List<Geometry> geometries = new ArrayList<>();
        try (FileReader reader = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_0.json")) {
            JsonObject feature = JsonParser.parseReader(reader).getAsJsonObject();
            String geometryStr = feature.getAsJsonObject("geometry").toString();
            Geometry geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            FileReader reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_1.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_2.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_3.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_4.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_5.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_6.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_7.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
            reader2 = new FileReader(Constants.getResourcePath() + "districts/enacted/az_district_8.json");
            feature = JsonParser.parseReader(reader2).getAsJsonObject();
            geometryStr = feature.getAsJsonObject("geometry").toString();
            geometry = geoReader.read(new StringReader(geometryStr));
            geometries.add(geometry);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("Error");
        }
        //Geometry boundary = LineDissolver.dissolve(gf.createGeometryCollection(geometries.toArray(new Geometry[] {})));
        Geometry boundary = gf.createGeometryCollection(geometries.toArray(new Geometry[] {})).union().getBoundary();
        GeoJsonWriter geoWriter = new GeoJsonWriter();
        String responseStr = geoWriter.write(boundary);
        JsonObject response = JsonParser.parseString(responseStr).getAsJsonObject();
        response.addProperty("type", "LineString");
        return ResponseEntity.ok(response);
    }

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