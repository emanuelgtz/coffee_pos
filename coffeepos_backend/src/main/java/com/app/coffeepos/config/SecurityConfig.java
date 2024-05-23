package com.app.coffeepos.config;

import com.app.coffeepos.security.jwt.JwtFilter;
import com.app.coffeepos.security.employeedetails.EmployeeDetailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final EmployeeDetailServiceImpl employeeDetailService;

  private final JwtFilter jwtFilter;

  public SecurityConfig(EmployeeDetailServiceImpl employeeDetailService, JwtFilter jwtFilter) {
    this.employeeDetailService = employeeDetailService;
    this.jwtFilter = jwtFilter;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

    return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(
                    req -> req
                            .requestMatchers("/login/**", "/register/**")
                            .permitAll()
                            .dispatcherTypeMatchers(HttpMethod.valueOf("/login/product"))
                            .authenticated()
                            .dispatcherTypeMatchers(HttpMethod.valueOf("/login/create-purchase"))
                            .authenticated()
                            .anyRequest()
                            .authenticated()
            ).userDetailsService(employeeDetailService)
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
  }
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}
