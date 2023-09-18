package com.planner.back.Repository;

import com.planner.back.Entity.planEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface planRepository extends JpaRepository<planEntity, Integer> {
}
