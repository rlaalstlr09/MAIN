package com.planner.back.Repository;

import com.planner.back.Entity.CheckListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListRepository extends JpaRepository <CheckListEntity, Integer> {
}
