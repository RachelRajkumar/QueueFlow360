package com.queueflow.controller;

import com.queueflow.entity.Setting;
import com.queueflow.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/settings")
@CrossOrigin("*")
public class SettingController {

    @Autowired
    private SettingService settingService;

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Setting> updateSetting(@RequestBody Setting setting) {
        return ResponseEntity.ok(settingService.updateSetting(setting));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Setting>> getAllSettings() {
        return ResponseEntity.ok(settingService.getAllSettings());
    }
}
