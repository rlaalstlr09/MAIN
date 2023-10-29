package com.planner.back.Service;

import com.planner.back.DTO.UserDto;
import com.planner.back.Repository.UserRepository;
import com.planner.back.Entity.UserEntity;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService  {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }
    public Optional<UserEntity> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
