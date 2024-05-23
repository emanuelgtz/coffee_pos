package com.app.coffeepos.service;

import com.app.coffeepos.models.Product;
import com.app.coffeepos.repository.ProductRepository;
import com.app.coffeepos.service.serinterface.ProductService;
import org.aspectj.util.PartialOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

  // Product repository
  private ProductRepository productRepository;

  @Autowired
  public ProductServiceImpl(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public List<Product> findAll() {
    return productRepository.findAll();
  }

  @Override
  public Product findById(int theId) {

    Optional<Product> result = productRepository.findById(theId);

    Product theProduct = null;

    if(result.isPresent()) {
      theProduct = result.get();
    } else {
      throw new RuntimeException("Finding the employee was not possible " + theId);
    }

    return theProduct;
  }


  @Override
  public Product save(Product theProduct) {
    return productRepository.save(theProduct);
  }

  @Override
  public void deleteById(int theId) {
    productRepository.deleteById(theId);
  }

}
