package com.planner.back.Controller;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Entity.UserEntity;
import com.planner.back.Repository.CheckListRepository;
import com.planner.back.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CheckController {
    private final CheckListRepository repository;
    private final SessionService sessionService;


    @PostMapping("/api/check")
    public ResponseEntity<?> createCheckList(HttpServletRequest request, @RequestBody CheckListEntity check){
        System.out.println("User info in session: " +  request.getSession().getAttribute("email"));
        try {
            check.setEmail(sessionService.getCurrentUserEmail(request));
            repository.save(check);
            return new ResponseEntity<>("체크리스트 작성 성공", HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>("체크리스트 작성 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/api/check")
    public List<CheckListEntity> getAllCheckList(HttpServletRequest request){
        System.out.println("User info in session: " + request.getSession().getAttribute("email"));
        return repository.findByEmail(sessionService.getCurrentUserEmail(request));
    }

    @GetMapping("/api/check/{id}")
    public CheckListEntity getCheckList(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Check List not found with id " + id));
    }
}
