package com.app.coffeepos.repository;

import com.app.coffeepos.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {


}
