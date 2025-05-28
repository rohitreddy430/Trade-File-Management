package com.mph.TradeFile.model;

import java.time.LocalDate;




public class FileLoadResponsedto {
	
	private Long id;
	
	private String fileName;
	private LocalDate localDate;
	private String status;
	private Integer recordCount;
	private String errors;
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
	public void setErrors(String errors) {
		this.errors = errors;
	}
	
	

}
