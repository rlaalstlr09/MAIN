package com.planner.back.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="checkList")
@Table(name="checkList")
public class checkListEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cNum;
    private String email;
    private String todo;
    private String place;
    private boolean chk;
}
