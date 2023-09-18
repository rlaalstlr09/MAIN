package com.planner.back.Repository;

import com.planner.back.Entity.checkListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface checkListRepository extends JpaRepository <checkListEntity, Integer> {
}
