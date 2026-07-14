package com.queueflow.controller;

import com.queueflow.entity.Token;
import com.queueflow.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tokens")
@CrossOrigin("*")
public class TokenController {

    @Autowired
    private TokenService tokenService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<Token> generateToken(@RequestBody Token token) {
        return ResponseEntity.ok(tokenService.generateToken(token));
    }

    @GetMapping("/{code}")
    public ResponseEntity<Token> getTokenByCode(@PathVariable String code) {
        return tokenService.getTokenByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
