package com.mph.TradeFile.model;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fileload")
public class FileLoad {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name = "Id")
	private Long id;
	
	@Column(name = "filename")
	private String fileName;
	
	@Column(name = "localdate")
	private LocalDate localDate;
	
	@Column(name = "Status")
	private String status;
	
	@Column(name = "recordcount")
	private Integer recordCount;
	
	@Column(name = "errors")
	private String errors;
	
	//constructors
	public FileLoad() {
		
	}
	
	public FileLoad(String Filename,LocalDate loaddate,String Status,Integer recordCount,String errors, String fileName, LocalDate localDate, String status) {
		
		this.fileName=fileName;
		this.localDate=localDate;
		this.status=status;
		this.recordCount=recordCount;
		this.errors=errors;
	}
	
	
	
	
	
	

	//Getters and setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public LocalDate getLocalDate() {
		return localDate;
	}
	public void setLocalDate(LocalDate localDate) {
		this.localDate = localDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getRecordCount() {
		return recordCount;
	}
	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}
	public String getErrors() {
		return errors;
	}
	public void setErrors(Object object) {
		this.errors = (String) object;
	}
	
	
	


	
	
}
