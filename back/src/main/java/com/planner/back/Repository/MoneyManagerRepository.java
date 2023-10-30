package com.planner.back.Repository;

import com.planner.back.Entity.MoneyManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoneyManagerRepository extends JpaRepository<MoneyManagerEntity, Long> {
    List<MoneyManagerEntity> findByEmail(String email);
}
