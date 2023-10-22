package com.planner.back.Controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/map")
public class MainController {
    @GetMapping("")
    public String hello(){
        return "Connection Successful";
    }

}
