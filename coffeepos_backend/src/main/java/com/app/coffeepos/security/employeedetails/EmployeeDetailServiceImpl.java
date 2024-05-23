package com.app.coffeepos.security.employeedetails;


import com.app.coffeepos.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDetailServiceImpl implements UserDetailsService {

  private final EmployeeRepository repository;

  @Autowired
  public EmployeeDetailServiceImpl(EmployeeRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String employeeEmail) throws UsernameNotFoundException {
      return repository
              .findByEmployeeEmail(employeeEmail)
              .orElseThrow(() -> new UsernameNotFoundException("Employee email not found - Exception"));
  }
}
