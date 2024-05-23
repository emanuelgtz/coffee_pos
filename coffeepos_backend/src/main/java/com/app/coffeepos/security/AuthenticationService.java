package com.app.coffeepos.security;

import com.app.coffeepos.models.AuthResponse;
import com.app.coffeepos.models.Employee;
import com.app.coffeepos.repository.EmployeeRepository;
import com.app.coffeepos.security.jwt.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

  private final EmployeeRepository employeeRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  public AuthenticationService(EmployeeRepository employeeRepository,
                               PasswordEncoder passwordEncoder,
                               JwtService jwtService,
                               AuthenticationManager authenticationManager
  ) {
    this.employeeRepository = employeeRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public AuthResponse register(Employee request) {

    Employee employee = new Employee();

    employee.setEmployeeName(request.getEmployeeName());
    employee.setEmployeeEmail(request.getEmployeeEmail());
    employee.setEmployeeAge(request.getEmployeeAge());
    employee.setEmployeePassword(passwordEncoder.encode(request.getEmployeePassword()));

    employee.setEmployeeAuthority(request.getEmployeeAuthority());

    employee = employeeRepository.save(employee);

    String token = jwtService.generateToken(employee);

    return new AuthResponse(token);

  }

  // method for login the employee
  public AuthResponse authenticate(Employee request) {

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmployeeEmail(),
                    request.getEmployeePassword()
            )
    );

    Employee employee = employeeRepository.findByEmployeeEmail(request.getEmployeeEmail()).orElseThrow();

    String token = jwtService.generateToken(employee);

    return new AuthResponse(token);

  }

}
