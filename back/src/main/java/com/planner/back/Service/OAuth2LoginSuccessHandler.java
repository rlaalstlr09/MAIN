package com.planner.back.Service;

import com.planner.back.Entity.UserEntity;
import com.planner.back.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Optional;

public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    public OAuth2LoginSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        Optional<UserEntity> optionalUser = userService.findByEmail(email);

        if (!optionalUser.isPresent()) {
            // If the user is logging in for the first time, create a new record.
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setName(name);

            userService.save(newUser);
        }
        request.getSession().setAttribute("email", email);
        System.out.println("User info in session: " + request.getSession().getAttribute("email"));
        response.sendRedirect("http://localhost:3000/");

    }
}
