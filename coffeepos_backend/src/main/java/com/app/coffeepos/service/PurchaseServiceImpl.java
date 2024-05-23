package com.app.coffeepos.service;

import com.app.coffeepos.models.Employee;
import com.app.coffeepos.models.Product;
import com.app.coffeepos.models.Purchase;
import com.app.coffeepos.repository.EmployeeRepository;
import com.app.coffeepos.repository.ProductRepository;
import com.app.coffeepos.repository.PurchaseRepository;
import com.app.coffeepos.service.serinterface.EmployeeService;
import com.app.coffeepos.service.serinterface.ProductService;
import com.app.coffeepos.service.serinterface.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseServiceImpl implements PurchaseService {

  @Autowired
  private PurchaseRepository purchaseRepository;

  @Autowired
  private EmployeeService employeeService;


  @Autowired
  public PurchaseServiceImpl(PurchaseRepository purchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  @Override
  public List<Purchase> findAll() {
    return purchaseRepository.findAll();
  }

  @Override
  public Purchase findById(int theId) {
    Optional<Purchase> result = purchaseRepository.findById(theId);

    Purchase thePurchase = null;

    if(result.isPresent()) {
      thePurchase = result.get();
    } else {
      throw new RuntimeException(
              "Finding the purchase id was not possible " + theId
      );
    }

    return thePurchase;
  }

  @Override
  public Purchase save(Purchase thePurchase) {
    return purchaseRepository.save(thePurchase);
  }

  @Override
  public void deleteById(int theId) {
    purchaseRepository.deleteById(theId);
  }

  @Override
  public Purchase createPurchase(Purchase purchase) {


    if (purchase.getQuantity() <= 0) {
      throw new IllegalArgumentException("Quantity cannot be zero or negative");

    }

    if (purchase.getEmployee_id_fk() == null) {
      throw new IllegalArgumentException("Employee ID cannot be null");
    }

    Employee employee = employeeService.findById(purchase.getEmployee_id_fk().getIdEmployee());
    if (employee == null) {
      throw new IllegalArgumentException("Employee with ID " + purchase.getEmployee_id_fk().getIdEmployee() + " not found");
    }

    if(purchase.getPurchase_date() == null) {
      purchase.setPurchase_date(new Date());
    }

    purchase.setEmployee_id_fk(employee);

    Purchase savedPurchase = purchaseRepository.save(purchase);

    List<Product> products = new ArrayList<>();
    purchase.setProducts(products);

    return savedPurchase;
  }


}
