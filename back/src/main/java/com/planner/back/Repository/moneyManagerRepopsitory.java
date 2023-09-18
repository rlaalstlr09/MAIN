package com.planner.back.Repository;

import com.planner.back.Entity.moneyManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface moneyManagerRepopsitory extends JpaRepository<moneyManagerEntity, Integer> {
}
