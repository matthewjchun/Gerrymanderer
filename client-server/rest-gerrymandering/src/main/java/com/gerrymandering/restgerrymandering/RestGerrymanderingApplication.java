package com.gerrymandering.restgerrymandering;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestGerrymanderingApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(RestGerrymanderingApplication.class, args);
    }

    @Autowired
    private StateRepository repository;

    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new State("Arizona"));
        this.repository.save(new State("Michigan"));
        this.repository.save(new State("Virginia"));
    }
}
