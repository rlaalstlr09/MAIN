package com.planner.back.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

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
    private Long id;
    private String title;
    private String email;
    private Date date;

    @OneToMany(mappedBy = "planner", fetch = FetchType.EAGER)
    private List<PlanEntity> plans;
}
