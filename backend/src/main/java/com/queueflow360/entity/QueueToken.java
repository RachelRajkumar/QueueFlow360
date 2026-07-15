package com.queueflow360.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueueToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @Column(name = "token_number", nullable = false)
    private String tokenNumber;

    @Column(nullable = false)
    private String status; // WAITING, IN_PROGRESS, COMPLETED, SKIPPED

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
