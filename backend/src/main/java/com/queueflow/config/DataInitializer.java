package com.queueflow.config;

import com.queueflow.entity.Branch;
import com.queueflow.entity.Department;
import com.queueflow.entity.Role;
import com.queueflow.entity.User;
import com.queueflow.repository.BranchRepository;
import com.queueflow.repository.DepartmentRepository;
import com.queueflow.repository.RoleRepository;
import com.queueflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Initialize Roles
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
            Role role = new Role();
            role.setName("ROLE_ADMIN");
            return roleRepository.save(role);
        });

        roleRepository.findByName("ROLE_MANAGER").orElseGet(() -> {
            Role role = new Role();
            role.setName("ROLE_MANAGER");
            return roleRepository.save(role);
        });

        roleRepository.findByName("ROLE_CUSTOMER").orElseGet(() -> {
            Role role = new Role();
            role.setName("ROLE_CUSTOMER");
            return roleRepository.save(role);
        });

        // 2. Initialize Admin User
        if (userRepository.findByEmail("admin@queueflow.com").isEmpty()) {
            User admin = new User();
            admin.setFirstName("Super");
            admin.setLastName("Admin");
            admin.setEmail("admin@queueflow.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setIsActive(true);
            
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);
            
            userRepository.save(admin);
            System.out.println("Default Admin User Created: admin@queueflow.com / admin123");
        }

        // 3. Initialize Default Branch & Department
        if (branchRepository.count() == 0) {
            Branch branch = new Branch();
            branch.setName("Headquarters");
            branch.setAddress("Downtown Metro");
            branch.setIsActive(true);
            branch = branchRepository.save(branch);

            Department dept = new Department();
            dept.setName("General Services");
            dept.setBranch(branch);
            dept.setIsActive(true);
            departmentRepository.save(dept);
        }
    }
}
