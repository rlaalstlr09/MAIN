package com.planner.back;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class MainController {
    @GetMapping("")
    public String hello(){
        return "Connection Successful";
    }

}
