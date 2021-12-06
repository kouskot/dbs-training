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
@Table(name="receiverdata")
public class Bank {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="Biccode")
	private String Biccode;
	
	@Column(name="Institutionname")
	private String Institutionname;

	public String getBiccode() {
		return Biccode;
	}

	public void setBiccode(String biccode) {
		Biccode = biccode;
	}

	public String getInstitutionname() {
		return Institutionname;
	}

	public void setInstitutionname(String institutionname) {
		Institutionname = institutionname;
	}
	
	

}
