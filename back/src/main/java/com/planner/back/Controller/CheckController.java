package com.planner.back.Controller;

import com.planner.back.Entity.CheckListEntity;
import com.planner.back.Entity.MoneyManagerEntity;
import com.planner.back.Entity.UserEntity;
import com.planner.back.Repository.CheckListRepository;
import com.planner.back.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST},allowCredentials = "true")
public class CheckController {
    private final CheckListRepository repository;
    private final SessionService sessionService;


    @PostMapping("/api/check")
    public ResponseEntity<?> createCheckList(HttpServletRequest request, @RequestBody CheckListEntity check){

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

    @PutMapping("/api/check/{id}")
    public CheckListEntity updateCheckList(HttpServletRequest request, @PathVariable Long id, @RequestBody CheckListEntity newCheckList) {
        String email = sessionService.getCurrentUserEmail(request);
        return repository.findById(id)

                .map(checkList -> {
                    if(!checkList.getEmail().equals(email)) {
                        throw new RuntimeException("권한이 없습니다.");
                    }
                    checkList.setTodo(newCheckList.getTodo());
                    checkList.setPlace(newCheckList.getPlace());
                    return repository.save(checkList);
                })
                .orElseGet(() -> {
                    newCheckList.setId(id);
                    return repository.save(newCheckList);
                });
    }

    @DeleteMapping("/api/check/{id}")
    public void deleteCheckList(HttpServletRequest request, @PathVariable Long id) {
        String email = sessionService.getCurrentUserEmail(request);
        CheckListEntity checkList = repository.findById(id).orElseThrow(() -> new RuntimeException("체크리스트가 존재하지 않습니다."));
        if(!checkList.getEmail().equals(email)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        repository.deleteById(id);
    }

    @PutMapping("api/check/checked/{id}")
    public CheckListEntity updateCheckStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> body) throws ChangeSetPersister.NotFoundException {
        // 체크리스트 항목을 찾습니다.
        CheckListEntity checkList = repository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);

        // 체크 상태를 변경합니다.
        checkList.setChecked(body.get("checked"));

        // 변경된 체크리스트를 저장하고 반환합니다.
        return repository.save(checkList);
    }

    @PutMapping("/api/check/checked/all")
    public Iterable<CheckListEntity> updateAllCheckStatus(HttpServletRequest request, @RequestBody Map<String, Boolean> body) {
        // 모든 체크리스트 항목을 가져옵니다.
        Iterable<CheckListEntity> allCheckLists = repository.findByEmail(sessionService.getCurrentUserEmail(request));

        // 각 체크리스트 항목의 체크 상태를 변경합니다.
        for (CheckListEntity checkList : allCheckLists) {
            checkList.setChecked(body.get("checked"));
        }

        // 변경된 체크리스트를 저장하고 반환합니다.
        return repository.saveAll(allCheckLists);
    }
}

