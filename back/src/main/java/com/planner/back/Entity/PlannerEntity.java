package com.planner.back.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="planner")
@Table(name="planner")
public class PlannerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int pNum;
    private String title;
    private String email;
    private String start_time;
    private String end_time;
    private Date date;
    private String todo;
    private String memo;
}
