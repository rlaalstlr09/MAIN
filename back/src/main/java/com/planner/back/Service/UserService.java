package com.planner.back.Service;

import com.planner.back.DTO.UserDto;
import com.planner.back.Repository.UserRepository;
import com.planner.back.Entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public UserEntity saveUser(String email, String nickname) {
        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setNickname(nickname);

        return userRepository.save(user);
    }

    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}