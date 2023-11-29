package com.planner.back.Repository;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckListRepository extends JpaRepository <CheckListEntity, Long> {
    @Transactional
    @Modifying
    @Query("update checkList c set c.checked = :checked where c.id = :id")
    int updateChecked(@Param("id") Long id, @Param("checked") boolean checked);


    List<CheckListEntity> findByEmail(String email);
}
