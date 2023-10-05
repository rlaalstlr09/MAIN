package com.planner.back.Controller;

import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Entity.PlannerEntity;
import com.planner.back.Repository.MoneyManagerRepopsitory;
import lombok.*;
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
public class MoneyController {
    private final MoneyManagerRepopsitory repository;

    @PostMapping("/api/money")
    public ResponseEntity<?> createMoneyManager(@RequestBody MoneyManagerEntity money){
        try {
            repository.save(money);
            return new ResponseEntity<>("예산관리 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("예산관리 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/api/money")
    public List<MoneyManagerEntity> getAllMoneyManager(){
        return repository.findAll();
    }

    @GetMapping("/api/money/{id}")
    public MoneyManagerEntity getMoneyManager(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MoneyManager not found with id " + id));
    }
}
