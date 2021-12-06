package com.paymentproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paymentproject.exception.ResourceNotFoundException;
import com.paymentproject.model.Bank;
import com.paymentproject.repository.BankRepository;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/receiverdata")
public class BankController {
	
@Autowired
private BankRepository bankRepository;

@GetMapping
public List<Bank> getAllBanks(){
	return bankRepository.findAll();
	
}

@GetMapping("{Biccode}")
public ResponseEntity<Bank> getBankById(@PathVariable String Biccode){
	//long A=Long.parseLong(Biccode);
 Bank bank= bankRepository.findById(Biccode)
		 .orElseThrow(() -> new ResourceNotFoundException("Bank not exists with id: " +  Biccode));
  return ResponseEntity.ok(bank);
}

}
