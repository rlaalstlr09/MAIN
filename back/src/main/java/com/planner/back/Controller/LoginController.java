package com.planner.back.Controller;

import com.nimbusds.jose.Payload;
import com.planner.back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/loginSuccess")
    public void getLoginInfo(OAuth2AuthenticationToken token) {
        String email = token.getPrincipal().getAttribute("email");
        String nickname = token.getPrincipal().getAttribute("name");

        userService.saveUser(email, nickname);
    }
    @GetMapping("/login")
    public OAuth2User user(OAuth2AuthenticationToken token) {
        return token.getPrincipal();
    }


}