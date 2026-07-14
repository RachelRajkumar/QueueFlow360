package com.queueflow.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "counters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Counter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "counter_number", nullable = false, length = 50)
    private String counterNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee currentEmployee;

    // e.g., 'AVAILABLE', 'BUSY', 'OFFLINE'
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private String status = "OFFLINE";

}
