package com.planner.back.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="moneyManager")
@Table(name="moneyManager")

public class MoneyManagerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Date date;


    private String email;

    @Column(nullable = false)
    private int outMoney;

    private String place;
    private int headCount;
}
