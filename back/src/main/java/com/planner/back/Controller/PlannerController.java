package com.planner.back.Controller;

import com.planner.back.Entity.PlanEntity;
import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.PlanRepository;
import com.planner.back.Repository.PlannerRepository;
import com.planner.back.Service.SessionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST},allowCredentials = "true")
public class PlannerController {
    @Autowired
    private PlannerRepository plannerRepository;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private PlanRepository planRepository;

    @PostMapping("/api/planner")
    public PlannerEntity createPlanner(HttpServletRequest request,  @RequestBody PlannerEntity planner){

            planner.setEmail(sessionService.getCurrentUserEmail(request));
            return plannerRepository.save(planner);

    }

    @PostMapping("/api/planner/{plannerId}/plan")
    public PlanEntity createPlan(@PathVariable Long plannerId, @RequestBody PlanEntity plan) {
        PlannerEntity planner = plannerRepository.findById(plannerId)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + plannerId));

        plan.setPlanner(planner);
        return planRepository.save(plan);
    }

    @GetMapping("/api/planner")
    public List<PlannerEntity> getAllPlanner(HttpServletRequest request){
        return plannerRepository.findByEmail(sessionService.getCurrentUserEmail(request));
    }

    @GetMapping("/api/planner/plan/{Id}")
    public PlanEntity getPlan(@PathVariable Long Id){
        return planRepository.findById(Id).orElseThrow(EntityNotFoundException::new);
    }

    @GetMapping("/api/planner/{id}")
    public PlannerEntity getPlanner(@PathVariable Long id, HttpServletRequest request) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        PlannerEntity planner = plannerRepository.findById(id).orElseThrow(() -> new RuntimeException("계획표가 존재하지 않습니다."));
        if(!planner.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }
        return plannerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Planner not found with id " + id));

    }
    @PutMapping("/api/planner/{plannerId}")
    public PlannerEntity updatePlanner(@PathVariable Long plannerId, HttpServletRequest request, @RequestBody Map<String, Object> payload) {
        PlannerEntity planner = plannerRepository.findById(plannerId)
                .orElseThrow(() -> new IllegalArgumentException("해당 계획표가 없습니다. id=" + plannerId));

        // 계획표 정보 업데이트
        planner.setTitle((String) payload.get("title"));
        String dateString = (String) payload.get("date");
        Date sqlDate = Date.valueOf(dateString);
        planner.setDate(sqlDate);
        planner.setEmail(sessionService.getCurrentUserEmail(request));

        // 계획 정보 업데이트
        List<Map<String, Object>> plansPayload = (List<Map<String, Object>>) payload.get("plans");
        List<PlanEntity> updatedPlans = new ArrayList<>();

        for (Map<String, Object> planPayload : plansPayload) {
            PlanEntity plan;
            if (planPayload.get("id") != null) {
                Long planId = ((Number) planPayload.get("id")).longValue();
                plan = planRepository.findById(planId).orElse(new PlanEntity());
            } else {
                plan = new PlanEntity();
            }
            plan.setStart_time((String) planPayload.get("start_time"));
            plan.setEnd_time((String) planPayload.get("end_time"));
            plan.setMemo((String) planPayload.get("memo"));
            plan.setPlace((String) planPayload.get("place"));
            plan.setTodo((String) planPayload.get("todo"));
            plan.setPlanner(planner);

            updatedPlans.add(plan);
            planRepository.save(plan); // 새롭게 추가된 계획 저장
        }

        // 삭제된 계획 제거
        List<PlanEntity> removedPlans = planner.getPlans().stream()
                .filter(plan -> !updatedPlans.contains(plan))
                .collect(Collectors.toList());

        for (PlanEntity removedPlan : removedPlans) {
            planRepository.delete(removedPlan); // 삭제된 계획 제거
        }

        planner.setPlans(updatedPlans); // 업데이트된 계획들로 설정

        return plannerRepository.save(planner);
    }
    @DeleteMapping("/api/planner/{id}")
    public void deleteCheckList(HttpServletRequest request, @PathVariable Long id) {
        String email = sessionService.getCurrentUserEmail(request);
        PlannerEntity planner = plannerRepository.findById(id).orElseThrow(() -> new RuntimeException("계획표가 존재하지 않습니다."));
        if(!planner.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        plannerRepository.deleteById(id);
    }
}
