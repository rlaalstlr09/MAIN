package com.planner.back.Controller;

import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.PlannerRepository;
import com.planner.back.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PlannerController {
    @Autowired
    private final PlannerRepository repository;
    private final SessionService sessionService;

    @PostMapping("/api/planner")
    public ResponseEntity<?> createPlanner(HttpServletRequest request,  @RequestBody PlannerEntity planner){
        try {
            planner.setEmail(sessionService.getCurrentUserEmail(request));
            repository.save(planner);
            return new ResponseEntity<>("계획표 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("계획표 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/planner")
    public List<PlannerEntity> getAllPlanner(HttpServletRequest request){
        return repository.findByEmail(sessionService.getCurrentUserEmail(request));
    }

    @GetMapping("/api/planner/{id}")
    public PlannerEntity getPlanner(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + id));
    }

}
