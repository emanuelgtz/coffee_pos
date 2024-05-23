package com.app.coffeepos.service.serinterface;

import com.app.coffeepos.models.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
  List<Employee> findAll();
  Employee findById(int theId);
  Employee findByEmail(String theEmail);
  Employee save(Employee theEmployee);
  void deleteById(int theId);
}
