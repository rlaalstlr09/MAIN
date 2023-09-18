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
@Entity(name="plan")
@Table(name="plan")
public class planEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pNum;
    private String email;
    private String start_time;
    private String end_time;
    private String todo;
    private String memo;
}
