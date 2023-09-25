package com.planner.back.Controller;

import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.PlannerRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController
@CrossOrigin(originPatterns = "http://localhost:3000")
public class PlannerController {
    private final PlannerRepository repository;

    @PostMapping("/planner")
    public ResponseEntity<?> createPlanner(@RequestBody PlannerEntity planner){
        try {
            repository.save(planner);
            return new ResponseEntity<>("계획표 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("계획표 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
