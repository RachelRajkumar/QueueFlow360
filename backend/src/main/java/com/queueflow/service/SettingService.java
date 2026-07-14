package com.queueflow.service;

import com.queueflow.entity.Setting;
import com.queueflow.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    public Setting updateSetting(Setting setting) {
        return settingRepository.save(setting);
    }

    public List<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    public Optional<Setting> getSettingByKey(String key) {
        return settingRepository.findBySettingKey(key);
    }
}
