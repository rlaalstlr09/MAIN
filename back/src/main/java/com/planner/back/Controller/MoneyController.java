package com.planner.back.Controller;

import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Repository.MoneyManagerRepopsitory;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController
@CrossOrigin(originPatterns = "http://localhost:3000")
public class MoneyController {
    private final MoneyManagerRepopsitory repository;

    @PostMapping("/money")
    public ResponseEntity<?> createMoneyManager(@RequestBody MoneyManagerEntity money){
        try {
            repository.save(money);
            return new ResponseEntity<>("예산관리 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("예산관리 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
