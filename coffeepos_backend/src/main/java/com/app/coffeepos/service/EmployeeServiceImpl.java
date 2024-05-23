package com.app.coffeepos.service;

import com.app.coffeepos.models.Employee;
import com.app.coffeepos.repository.EmployeeRepository;
import com.app.coffeepos.service.serinterface.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  @Override
  public List<Employee> findAll() {
    return employeeRepository.findAll();
  }

  @Override
  public Employee findById(int theId) {

    Optional<Employee> result = employeeRepository.findById(theId);

    Employee theEmployee = null;

    if(result.isPresent()) {
      theEmployee = result.get();
    } else {
      throw new RuntimeException("Finding the employee was not possible " + theId);
    }

    return theEmployee;
  }

  @Override
  public Employee findByEmail(String theEmail) {
    Optional<Employee> result = employeeRepository.findByEmployeeEmail(theEmail);

    Employee theEmployeeEmail = null;

    if(result.isPresent()) {
      theEmployeeEmail = result.get();
    } else {
      throw new RuntimeException("Finding the employee was not possible " + theEmail);
    }

    return theEmployeeEmail;
  }

  @Override
  public Employee save(Employee theEmployee) {
    return employeeRepository.save(theEmployee);
  }

  @Override
  public void deleteById(int theId) {
    employeeRepository.deleteById(theId);
  }
}
