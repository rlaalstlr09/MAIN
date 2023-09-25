package com.planner.back.Repository;

import com.planner.back.Entity.MoneyManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoneyManagerRepopsitory extends JpaRepository<MoneyManagerEntity, Integer> {
}
