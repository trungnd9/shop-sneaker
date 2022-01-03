package com.devcamp.sneaker.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employees")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotEmpty(message = "Enter lastname")
	@Column(name = "last_name", nullable = false)
	private String lastName;
	
	@NotEmpty(message = "Enter firstname")
	@Column(name = "first_name", nullable = false)
	private String firstName;
	
	@Column(name = "extension", nullable = false)
	private String extension;
	
	@NotEmpty(message = "Enter email")
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "office_code", nullable = false)
	private int officeCode;
	
	@Column(name = "report_to")
	private int reportTo;
	
	@Column(name = "job_title", nullable = false)
	private String jobTitle;
	
	@Transient
	private String userNameEmployee;
	
	@OneToOne
	@JsonIgnore
	private User user;
	
	public Employee() {
		super();
	}
	
	public Employee(int id, String lastName, String firstName, String extension, String email, int officeCode,
			int reportTo, String jobTitle) {
		super();
		this.id = id;
		this.lastName = lastName;
		this.firstName = firstName;
		this.extension = extension;
		this.email = email;
		this.officeCode = officeCode;
		this.reportTo = reportTo;
		this.jobTitle = jobTitle;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getOfficeCode() {
		return officeCode;
	}

	public void setOfficeCode(int officeCode) {
		this.officeCode = officeCode;
	}

	public int getReportTo() {
		return reportTo;
	}

	public void setReportTo(int reportTo) {
		this.reportTo = reportTo;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getUserNameEmployee() {
		if (getUser() == null) {
			return null;
		}
		else {
			return getUser().getUsername();
		}
	}

	public void setUserNameEmployee(String userNameEmployee) {
		this.userNameEmployee = userNameEmployee;
	}
	
	
}
