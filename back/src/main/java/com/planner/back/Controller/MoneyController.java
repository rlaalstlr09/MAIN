package com.planner.back.Controller;

import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Repository.MoneyManagerRepository;
import com.planner.back.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MoneyController {
    private final MoneyManagerRepository repository;
    private final SessionService sessionService;

    @PostMapping("/api/money")
    public ResponseEntity<?> createMoneyManager(HttpServletRequest request,  @RequestBody MoneyManagerEntity money){
        try {
            money.setEmail(sessionService.getCurrentUserEmail(request));
            repository.save(money);
            return new ResponseEntity<>("예산관리 작성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("예산관리 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/api/money")
    public List<MoneyManagerEntity> getAllMoneyManager(HttpServletRequest request){
        return repository.findByEmail(sessionService.getCurrentUserEmail(request));
    }

    @GetMapping("/api/money/{id}")
    public MoneyManagerEntity getMoneyManager(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MoneyManager not found with id " + id));
    }
}
