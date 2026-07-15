package com.queueflow360.repository;

import com.queueflow360.entity.QueueToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QueueTokenRepository extends JpaRepository<QueueToken, Long> {
    List<QueueToken> findByStatusOrderByCreatedAtAsc(String status);
    Optional<QueueToken> findByAppointmentId(Long appointmentId);
    long countByStatus(String status);
    long countByAppointment_Department_Id(Long departmentId);
}
