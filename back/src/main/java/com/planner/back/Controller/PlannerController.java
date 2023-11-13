package com.planner.back.Controller;

import com.planner.back.Entity.PlanEntity;
import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.PlanRepository;
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

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST},allowCredentials = "true")
public class PlannerController {

    private final PlannerRepository PlannerRepository;
    private final SessionService sessionService;
    private final PlanRepository planRepository;

    @PostMapping("/api/planner")
    public PlannerEntity createPlanner(HttpServletRequest request,  @RequestBody PlannerEntity planner){

            planner.setEmail(sessionService.getCurrentUserEmail(request));
            return PlannerRepository.save(planner);

    }

    @PostMapping("/api/planner/{plannerId}/plan")
    public PlanEntity createPlan(@PathVariable Long plannerId, @RequestBody PlanEntity plan) {
        PlannerEntity planner = PlannerRepository.findById(plannerId)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + plannerId));

        plan.setPlanner(planner);
        return planRepository.save(plan);
    }

    @GetMapping("/api/planner")
    public List<PlannerEntity> getAllPlanner(HttpServletRequest request){
        return PlannerRepository.findByEmail(sessionService.getCurrentUserEmail(request));
    }

    @GetMapping("/api/planner/{id}")
    public PlannerEntity getPlanner(@PathVariable Long id, HttpServletRequest request) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        PlannerEntity planner = PlannerRepository.findById(id).orElseThrow(() -> new RuntimeException("계획표가 존재하지 않습니다."));
        if(!planner.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }
        return PlannerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + id));

    }
    @PutMapping("/api/planner/{id}")
    public PlannerEntity updateCheckList(HttpServletRequest request, @PathVariable Long id, @RequestBody PlannerEntity newPlanner) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        return PlannerRepository.findById(id)

                .map(Planner -> {
                    if(!Planner.getEmail().equals(email)) {
                        throw new RuntimeException("권한이 없습니다.");
                    }

                    Planner.setDate(newPlanner.getDate());
                    Planner.setTitle(newPlanner.getTitle());

                    return PlannerRepository.save(Planner);
                })
                .orElseGet(() -> {
                    newPlanner.setId(id);
                    return PlannerRepository.save(newPlanner);
                });
    }

    @DeleteMapping("/api/planner/{id}")
    public void deleteCheckList(HttpServletRequest request, @PathVariable Long id) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        PlannerEntity planner = PlannerRepository.findById(id).orElseThrow(() -> new RuntimeException("계획표가 존재하지 않습니다."));
        if(!planner.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        PlannerRepository.deleteById(id);
    }
}
