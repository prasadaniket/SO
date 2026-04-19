package com.unicord.stoneoven;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StoneOvenApplication {
    public static void main(String[] args) {
        SpringApplication.run(StoneOvenApplication.class, args);
    }
}
