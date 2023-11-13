package com.planner.back.Repository;

import com.planner.back.Entity.PlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<PlanEntity,Long> {
}
