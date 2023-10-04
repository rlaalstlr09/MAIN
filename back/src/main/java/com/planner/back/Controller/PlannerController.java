package com.planner.back.Controller;

import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.PlannerRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController
@CrossOrigin(originPatterns = "http://localhost:3000")
public class PlannerController {
    @Autowired
    private final PlannerRepository repository;

    @PostMapping("/api/planner")
    public ResponseEntity<?> createPlanner(@RequestBody PlannerEntity planner){
        try {
            repository.save(planner);
            return new ResponseEntity<>("계획표 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("계획표 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/planner")
    public List<PlannerEntity> getAllPlanner(){
        return repository.findAll();
    }

    @GetMapping("/api/planner/{id}")
    public PlannerEntity getPlanner(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + id));
    }

}
