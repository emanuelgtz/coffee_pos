package com.app.coffeepos.controller;


import com.app.coffeepos.models.Product;
import com.app.coffeepos.service.serinterface.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

  @Autowired
  private ProductService productService;


  @GetMapping("/login/product")
  public ResponseEntity<List<Product>> getAllProducts() {
    List<Product> products = productService.findAll();

    return ResponseEntity.ok(products);
  }
}
