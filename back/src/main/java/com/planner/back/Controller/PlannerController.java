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
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST},allowCredentials = "true")
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
    @PutMapping("/api/planner/{id}")
    public PlannerEntity updateCheckList(HttpServletRequest request, @PathVariable Long id, @RequestBody PlannerEntity newPlanner) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        return repository.findById(id)

                .map(Planner -> {
                    if(!Planner.getEmail().equals(email)) {
                        throw new RuntimeException("권한이 없습니다.");
                    }
                    Planner.setDate(newPlanner.getDate());
                    Planner.setPlace(newPlanner.getPlace());
                    Planner.setTitle(newPlanner.getTitle());
                    Planner.setTodo(newPlanner.getTodo());
                    Planner.setStart_time(newPlanner.getStart_time());
                    Planner.setEnd_time(newPlanner.getEnd_time());
                    Planner.setMemo(newPlanner.getMemo());

                    return repository.save(Planner);
                })
                .orElseGet(() -> {
                    newPlanner.setId(id);
                    return repository.save(newPlanner);
                });
    }

    @DeleteMapping("/api/planner/{id}")
    public void deleteCheckList(HttpServletRequest request, @PathVariable Long id) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        PlannerEntity planner = repository.findById(id).orElseThrow(() -> new RuntimeException("계획표가 존재하지 않습니다."));
        if(!planner.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        repository.deleteById(id);
    }
}
