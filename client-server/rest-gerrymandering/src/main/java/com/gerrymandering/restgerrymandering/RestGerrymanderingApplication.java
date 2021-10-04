package com.gerrymandering.restgerrymandering;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;

@SpringBootApplication
public class RestGerrymanderingApplication implements CommandLineRunner {
    // autowire relationships between collaborating beans
    // injects the DistrictingRepository bean into the RestGerrymanderingApplication bean
    @Autowired
    private DistrictingRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(RestGerrymanderingApplication.class, args);
    }

    private String readFromInputStream(InputStream is) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
        }
        return sb.toString();
    }
    // run method runs after application context is loaded but before the main method is finished
    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new Districting("Arizona"));
        this.repository.save(new Districting("Michigan"));
        this.repository.save(new Districting("Virginia"));
        /*InputStream is = this.getClass().getClassLoader().getResourceAsStream("data/AZ_Congressional_Districts_2020.json");
        try {
            String jsonString = readFromInputStream(is);
            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(jsonString);
            String state = "Arizona";
            JSONObject features = (JSONObject) obj.get("features");
            for (int i = 0 ; i <= 8; i++) {
                JSONObject district = (JSONObject) features.get("" + i);
                JSONObject geometry = (JSONObject) district.get("geometry");
                int[][][] coordinates = (int[][][]) geometry.get("coordinates");
                JSONObject properties = (JSONObject) district.get("properties");
                this.repository.save(new Districting("Arizona", coordinates, properties));
            }
        }
        catch (Exception e) {
            System.out.println("Error.");
        }*/
    }
}
