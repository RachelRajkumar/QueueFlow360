package com.queueflow.repository;

import com.queueflow.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {
    List<Queue> findByStatus(String status);
    List<Queue> findByDepartmentIdAndStatus(Long departmentId, String status);
}
