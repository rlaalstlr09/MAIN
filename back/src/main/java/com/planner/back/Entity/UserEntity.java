package com.planner.back.Entity;
import jakarta.persistence.*;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="User")
@Table(name="User")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String name;
    private String role;
    private String provider;
    private String providerId;


    public UserEntity(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
