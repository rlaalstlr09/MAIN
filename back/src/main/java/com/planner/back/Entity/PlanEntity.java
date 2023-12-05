package com.planner.back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Entity(name="plan")
@Table(name="plan")
public class PlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "planner_id")
    private PlannerEntity planner;

    @Column(nullable = false)
    private String start_time;

    @Column(nullable = false)
    private String end_time;

    @Column(nullable = false)
    private String todo;

    private String memo;

    @Column(nullable = false)
    private String place;

    public Date getPlannerDate() {
        return planner.getDate();
    }
}
