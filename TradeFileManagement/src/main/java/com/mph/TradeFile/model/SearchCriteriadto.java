package com.mph.TradeFile.model;

import java.sql.Date;

public class SearchCriteriadto {
	private Long id;
	private String fileName;
	private String status;
	private Date fromdate;
	private Date todate;
	
	
	//constructor
	public SearchCriteriadto(Long id, String fileName, Date toDate, Date fromDate, String status) {
		
		this.id = id;
		this.fileName = fileName;
		this.status = status;
		this.fromdate = fromDate;
		this.todate = toDate;
	}
	
	
	
	//Getters and Setters
	
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


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Date getFromdate() {
		return fromdate;
	}


	public void setFromdate(Date fromdate) {
		this.fromdate = fromdate;
	}


	public Date getTodate() {
		return todate;
	}


	public void setTodate(Date todate) {
		this.todate = todate;
	}




	
}
