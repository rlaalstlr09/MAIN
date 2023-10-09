//package com.planner.back.Config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import com.planner.back.Service.OAuth2UserService;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@RequiredArgsConstructor
//@EnableWebSecurity
//public class SecurityConfig {
//    private final OAuth2UserService oAuth2MemberService;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
//        return httpSecurity
//                .csrf(c -> c.disable())
//                .cors(withDefaults())
//                .authorizeRequests(r -> r.anyRequest().authenticated())
//                .oauth2Login(o -> o.authorizationEndpoint()
//                        .baseUri("/oauth2/authorize/client")
//                        .and()
//                        .tokenEndpoint()
//                        .accessTokenResponseClient(accessTokenResponseClient())
//                )
//                .userInfoEndpoint(u -> u.userService(oAuth2MemberService))
//                .build();
//    }
//}
