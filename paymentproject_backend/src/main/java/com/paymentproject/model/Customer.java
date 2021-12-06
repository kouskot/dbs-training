package com.paymentproject.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="internaldata")
public class Customer {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	@Column(columnDefinition = "NUMERIC(19,0)")
private Long Accountnumber;
@Column(name="Accountholdername")
private String Accountholdername;
@Column(columnDefinition = "NUMERIC(19,0)")
private float Clearbalance;
@Column(name="Overdraft")
private String Overdraft;
public Long getAccountnumber() {
	return Accountnumber;
}
public void setAccountnumber(Long accountnumber) {
	Accountnumber = accountnumber;
}
public String getAccountholdername() {
	return Accountholdername;
}
public void setAccountholdername(String accountholdername) {
	Accountholdername = accountholdername;
}

public float getClearbalance() {
	return Clearbalance;
}
public void setClearbalance(float clearbalance) {
	Clearbalance = clearbalance;
}
public String getOverdraft() {
	return Overdraft;
}
public void setOverdraft(String overdraft) {
	Overdraft = overdraft;
}

}
