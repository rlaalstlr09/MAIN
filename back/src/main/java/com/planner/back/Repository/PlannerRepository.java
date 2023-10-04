package com.planner.back.Repository;

import com.planner.back.Entity.PlannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlannerRepository extends JpaRepository<PlannerEntity, Long> {
}
