package com.queueflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Queueflow360Application {

    public static void main(String[] args) {
        SpringApplication.run(Queueflow360Application.class, args);
        System.out.println("✅ QueueFlow 360 Backend Started Successfully!");
    }

}
