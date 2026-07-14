package com.queueflow.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "employee_code", nullable = false, unique = true, length = 50)
    private String employeeCode;
    
    // We will add relationships to Department and Counter in upcoming files
    
    @Column(name = "working_hours_start")
    private java.time.LocalTime workingHoursStart;

    @Column(name = "working_hours_end")
    private java.time.LocalTime workingHoursEnd;
    
    @Column(name = "is_available", nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;

}
