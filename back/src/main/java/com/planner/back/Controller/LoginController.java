package com.planner.back.Controller;

import com.nimbusds.jose.Payload;
import com.planner.back.Entity.UserEntity;
import com.planner.back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

import java.security.Principal;
import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;


    @GetMapping("/loginSuccese")
    public OAuth2User user(OAuth2AuthenticationToken token) {
        return token.getPrincipal();
    }


}