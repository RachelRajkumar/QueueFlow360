package com.queueflow360.service;

import com.queueflow360.dto.AuthRequest;
import com.queueflow360.dto.AuthResponse;
import com.queueflow360.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse register(RegisterRequest request);
}
