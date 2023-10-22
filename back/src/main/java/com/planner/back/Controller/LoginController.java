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
    @PostMapping("/api/login")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> payload) {
        String idTokenString = payload.get("idtoken");

        // Google IdTokenVerifier 객체 생성
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport(), jsonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        // ID 토큰 검증
        GoogleIdToken idToken = verifier.verify(idTokenString);

        if (idToken != null) {
            Payload payload = idToken.getPayload();

            // User ID 확인
            String userId = payload.getSubject();

            // TODO: userId로 데이터베이스 조회 후 로그인 처리

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}