package com.planner.back.Repository;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface MoneyManagerRepository extends JpaRepository<MoneyManagerEntity, Long> {
    List<MoneyManagerEntity> findByEmail(String email);
}
