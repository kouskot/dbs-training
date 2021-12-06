package com.paymentproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paymentproject.model.Customer;
import com.paymentproject.repository.CustomerRepository;

import com.paymentproject.exception.ResourceNotFoundException;





@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/internaldata")
public class CustomerController {
@Autowired 
private CustomerRepository customerRepository;

@GetMapping
public List<Customer> getAllCustomers(){
    return customerRepository.findAll();
}

@GetMapping("{AccountNumber}")
public ResponseEntity<Customer> getCustomerById(@PathVariable String AccountNumber){
	long A=Long.parseLong(AccountNumber);
 Customer customer = customerRepository.findById(A)
		 .orElseThrow(() -> new ResourceNotFoundException("Customer not exists with id: " +  AccountNumber));
  return ResponseEntity.ok(customer);
}


@PutMapping("{AccountNumber}")
public ResponseEntity<Customer> updateCustomer(
        @PathVariable String AccountNumber,
        @RequestBody Customer customerDetails){
	long A=Long.parseLong(AccountNumber);
    Customer updateCustomer = customerRepository.findById(A)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not exists with id: " +  A));

    // Read  from request and set data to employee
    updateCustomer.setAccountholdername(customerDetails.getAccountholdername());
    updateCustomer.setClearbalance(customerDetails.getClearbalance());
    updateCustomer.setOverdraft(customerDetails.getOverdraft());

    // Save into database
    customerRepository.save(updateCustomer);

    return ResponseEntity.ok(updateCustomer);
}



}
