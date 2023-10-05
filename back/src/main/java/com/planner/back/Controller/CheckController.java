package com.planner.back.Controller;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Repository.CheckListRepository;
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
public class CheckController {
    private final CheckListRepository repository;

    @PostMapping("/api/check")
    public ResponseEntity<?> createCheckList(@RequestBody CheckListEntity check){
        try {
            repository.save(check);
            return new ResponseEntity<>("체크리스트 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("체크리스트 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/api/check")
    public List<CheckListEntity> getAllCheckList(){
        return repository.findAll();
    }

    @GetMapping("/api/check/{id}")
    public CheckListEntity getCheckList(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MoneyManager not found with id " + id));
    }
}
