package com.app.coffeepos.service.serinterface;


import com.app.coffeepos.models.Product;

import java.util.List;

public interface ProductService {
  List<Product> findAll();
  Product findById(int theId);
  Product save(Product theProduct);
  void deleteById(int theId);

}
