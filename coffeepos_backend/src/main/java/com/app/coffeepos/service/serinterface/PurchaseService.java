package com.app.coffeepos.service.serinterface;

import com.app.coffeepos.models.Product;
import com.app.coffeepos.models.Purchase;

import java.util.List;

public interface PurchaseService {
  List<Purchase> findAll();
  Purchase findById(int theId);
  Purchase save(Purchase thePurchase);
  void deleteById(int theId);
  Purchase createPurchase(Purchase request);
}
