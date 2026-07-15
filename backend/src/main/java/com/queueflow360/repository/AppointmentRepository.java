package com.queueflow360.repository;

import com.queueflow360.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByCustomerId(Long customerId);
    List<Appointment> findByAppointmentDate(LocalDate date);
    long countByAppointmentDate(LocalDate date);
}
