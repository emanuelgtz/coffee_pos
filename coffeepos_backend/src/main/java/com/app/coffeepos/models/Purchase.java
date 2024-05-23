package com.app.coffeepos.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Purchase")
public class Purchase {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_purchase")
  private int id_purchase;

  @Column(name = "purchase_date")
  private Date purchase_date;

  @Column(name = "quantity")
  private int quantity;


  @Getter
  @Setter
  @ManyToOne
  @JoinColumn(name = "employee_id_fk")
  private Employee employee_id_fk;


  @Getter
  @Setter
  @ManyToMany
  @JoinTable(
          name = "purchase_product",
          joinColumns = @JoinColumn(name = "purchase_id_fk"),
          inverseJoinColumns = @JoinColumn(name = "product_id_fk")
  )
  private List<Product> products;
}
