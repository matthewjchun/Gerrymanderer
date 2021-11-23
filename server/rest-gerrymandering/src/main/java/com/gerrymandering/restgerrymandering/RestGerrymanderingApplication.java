package com.gerrymandering.restgerrymandering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RestGerrymanderingApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestGerrymanderingApplication.class, args);
    }
}
