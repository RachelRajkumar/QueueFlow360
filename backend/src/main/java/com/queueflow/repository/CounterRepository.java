package com.queueflow.repository;

import com.queueflow.entity.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounterRepository extends JpaRepository<Counter, Long> {
    List<Counter> findByDepartmentId(Long departmentId);
    List<Counter> findByStatus(String status);
}
