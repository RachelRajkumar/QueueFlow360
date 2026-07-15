package com.queueflow360.service.impl;

import com.queueflow360.dto.AuthRequest;
import com.queueflow360.dto.AuthResponse;
import com.queueflow360.dto.RegisterRequest;
import com.queueflow360.entity.Customer;
import com.queueflow360.entity.Role;
import com.queueflow360.entity.User;
import com.queueflow360.repository.CustomerRepository;
import com.queueflow360.repository.UserRepository;
import com.queueflow360.security.JwtUtil;
import com.queueflow360.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserRepository userRepository, CustomerRepository customerRepository,
                           PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getName(), user.getRole().name());
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_CUSTOMER)
                .build();

        User savedUser = userRepository.save(user);

        Customer customer = Customer.builder()
                .user(savedUser)
                .phone(request.getPhone())
                .address(request.getAddress())
                .build();
        customerRepository.save(customer);

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
        return new AuthResponse(token, savedUser.getId(), savedUser.getEmail(), savedUser.getName(), savedUser.getRole().name());
    }
}
