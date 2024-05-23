package com.app.coffeepos.repository;

import com.app.coffeepos.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
  Optional<Employee> findByEmployeeName(String employeeName);
  Optional<Employee> findByEmployeeEmail(String employeeEmail);
}
