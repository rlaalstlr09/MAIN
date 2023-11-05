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
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST},allowCredentials = "true")
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

    @PutMapping("/api/money/{id}")
    public MoneyManagerEntity updateCheckList(HttpServletRequest request, @PathVariable Long id, @RequestBody MoneyManagerEntity newMoneyManager) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        return repository.findById(id)

                .map(moneyManager -> {
                    if(!moneyManager.getEmail().equals(email)) {
                        throw new RuntimeException("권한이 없습니다.");
                    }
                    moneyManager.setDate(newMoneyManager.getDate());
                    moneyManager.setPlace(newMoneyManager.getPlace());
                    moneyManager.setInMoney(newMoneyManager.getInMoney());
                    moneyManager.setOutMoney(newMoneyManager.getOutMoney());
                    moneyManager.setHeadCount(newMoneyManager.getHeadCount());
                    return repository.save(moneyManager);
                })
                .orElseGet(() -> {
                    newMoneyManager.setId(id);
                    return repository.save(newMoneyManager);
                });
    }

    @DeleteMapping("/api/money/{id}")
    public void deleteCheckList(HttpServletRequest request, @PathVariable Long id) {
        String email = (String) sessionService.getCurrentUserEmail(request);
        MoneyManagerEntity moneyManager = repository.findById(id).orElseThrow(() -> new RuntimeException("예산관리가 존재하지 않습니다."));
        if(!moneyManager.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        repository.deleteById(id);
    }
}
