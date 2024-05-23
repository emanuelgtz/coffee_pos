package com.app.coffeepos.controller;

import com.app.coffeepos.models.Purchase;
import com.app.coffeepos.service.serinterface.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PurchaseController {
  @Autowired
  private PurchaseService purchaseService;

  public PurchaseController(PurchaseService purchaseService) {
    this.purchaseService = purchaseService;
  }


  @PostMapping("/login/create-purchase")
  public ResponseEntity<Purchase> createPurchase(@RequestBody Purchase request) {
    return ResponseEntity.ok(purchaseService.createPurchase(request));
  }

}
