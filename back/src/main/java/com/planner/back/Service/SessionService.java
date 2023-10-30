package com.planner.back.Service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    public String getCurrentUserEmail(HttpServletRequest request) {
        return (String) request.getSession().getAttribute("email");
    }
}
