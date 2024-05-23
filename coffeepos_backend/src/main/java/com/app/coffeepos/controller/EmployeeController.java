package com.app.coffeepos.controller;

import com.app.coffeepos.models.Employee;
import com.app.coffeepos.service.EmployeeServiceImpl;
import com.app.coffeepos.service.serinterface.EmployeeService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/login/userinfo/{email}")
  public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email) {
    Optional<Employee> employeeOptional = Optional.ofNullable(employeeService.findByEmail(email));


    if(employeeOptional.isPresent()) {
      return ResponseEntity.ok(employeeOptional.get());
    } else  {
      return ResponseEntity.notFound().build();
    }

  }

}
