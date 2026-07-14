package com.queueflow.util;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class ValidationUtil {

    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String PHONE_PATTERN = "^\\+?[0-9. ()-]{7,25}$";

    public boolean isValidEmail(String email) {
        if (email == null) return false;
        return Pattern.compile(EMAIL_PATTERN).matcher(email).matches();
    }

    public boolean isValidPhone(String phone) {
        if (phone == null) return false;
        return Pattern.compile(PHONE_PATTERN).matcher(phone).matches();
    }

    public boolean isPasswordStrong(String password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
        if (password == null || password.length() < 8) return false;
        return password.matches(".*[A-Z].*") && password.matches(".*[a-z].*") && password.matches(".*\\d.*");
    }
}
