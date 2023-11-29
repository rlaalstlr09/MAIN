package com.planner.back.Service;

import com.planner.back.Entity.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    public String getCurrentUserEmail(HttpServletRequest request) {
        return (String) request.getSession().getAttribute("email");
    }
}
