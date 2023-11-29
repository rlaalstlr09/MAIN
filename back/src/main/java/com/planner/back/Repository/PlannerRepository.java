package com.planner.back.Repository;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlannerRepository extends JpaRepository<PlannerEntity, Long> {
    List<PlannerEntity> findByEmail(String email);

}
