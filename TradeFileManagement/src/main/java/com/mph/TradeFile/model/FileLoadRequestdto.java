package com.mph.TradeFile.model;

import java.time.LocalDate;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class FileLoadRequestdto {
	@NotNull(message="File cannot be empty")
	@Size(min=1,max=255,message="File size should be between 1 to 225")
	@Pattern(regexp = ".*\\.csv$",message="file should have .csv extention")
	private String fileName;
	
	@NotNull(message="Date cannot be empty")
	private LocalDate localDate;
	
	@NotNull(message="Status cannot be empty")
	@Pattern(regexp="NEW||FAILED||PROCESSED",message="status must be new,processed,failed")
	private String status;
	
	@PositiveOrZero(message="value must be either posititve or zero")
	private Integer recordCount;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public LocalDate getLoadDate() {
		return localDate;
	}

	public void setLoadDate(LocalDate loadDate) {
		this.localDate = loadDate;
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

	public Object getErrors() {
		return null;
	}
	
	
	
	
	
	
	
	

	

}
