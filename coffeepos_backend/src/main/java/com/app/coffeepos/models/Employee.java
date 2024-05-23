package com.app.coffeepos.models;


import com.app.coffeepos.enums.Authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Employee")
public class Employee implements UserDetails {

  public Employee(int idEmployee) {
    this.idEmployee = idEmployee;
  }


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_employee")
  private int idEmployee;

  @Column(name = "employee_name")
  private String employeeName;

  @Column(name = "employee_email")
  private String employeeEmail;

  @Column(name = "employee_age")
  private int employeeAge;

  @Column(name = "employee_psword")
  private String employeePassword;

  @Getter
  @Setter
  @Column(name = "employee_authority")
  @Enumerated(value = EnumType.STRING)
  private Authority employeeAuthority;

  // Bidirectional relation between tables
  @JsonIgnore
  @Getter
  @Setter
  @OneToMany(mappedBy = "employee_id_fk")
  private List<Purchase> purchases;

  
  // UserDetails methods
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(employeeAuthority.name()));
  }

  @Override
  public String getPassword() {
    return employeePassword;
  }

  @Override
  public String getUsername() {
    return employeeEmail;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
