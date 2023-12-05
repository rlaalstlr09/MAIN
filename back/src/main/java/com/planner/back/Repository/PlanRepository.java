package com.planner.back.Repository;

import com.planner.back.Entity.PlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanRepository extends JpaRepository<PlanEntity,Long> {
    Optional<PlanEntity> findById(Long id);
}
