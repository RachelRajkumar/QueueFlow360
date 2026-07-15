package com.queueflow360.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
