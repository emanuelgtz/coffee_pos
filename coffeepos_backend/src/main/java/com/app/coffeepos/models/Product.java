package com.app.coffeepos.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_product")
  private int idProduct;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "product_size")
  private String productSize;

  @Column(name = "product_price")
  private int productPrice;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
          name = "purchase_product",
          joinColumns = @JoinColumn(name = "product_id_fk"),
          inverseJoinColumns = @JoinColumn(name = "purchase_id_fk")
  )
  private List<Purchase> purchases;

}
