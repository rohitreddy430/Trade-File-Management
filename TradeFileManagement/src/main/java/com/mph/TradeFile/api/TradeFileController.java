package com.mph.TradeFile.api;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mph.TradeFile.model.FileLoad;
import com.mph.TradeFile.model.FileLoadRequestdto;
import com.mph.TradeFile.model.FileLoadResponsedto;
import com.mph.TradeFile.model.SearchCriteriadto;
import com.mph.TradeFile.service.FileService;

@RestController
@RequestMapping("/api/file")
public class TradeFileController {
	@Autowired
	FileService fileloadservice;
	@PostMapping
	public void saveDetails(@RequestBody FileLoadRequestdto fileloadrequestdto) {
		fileloadservice.createFileLoad(fileloadrequestdto);
	}	
	@GetMapping("{id}")
	public ResponseEntity<FileLoadResponsedto> get(@PathVariable Long id){
		FileLoadResponsedto response=fileloadservice.getFileLoadById(id);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<FileLoad>>criteria(
			@RequestParam(required = false) Long id,
			@RequestParam(required = false) String fileName,
			@RequestParam(required = false) Date fromdate,
			@RequestParam(required = false) Date todate,
			@RequestParam(required = false) String status){
		
		
		SearchCriteriadto search = new SearchCriteriadto(id,fileName,fromdate,todate,status);
		List<FileLoad> searchrows=fileloadservice.searchFileLoads(search);
		return ResponseEntity.ok(searchrows);
	}
	
	@PutMapping("/{id}/status")
	public ResponseEntity<FileLoadResponsedto>updateDetails(@PathVariable Long id,@RequestBody String Status){
		return ResponseEntity.ok(fileloadservice.updateFileLoadStatus(id, Status));
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		fileloadservice.deleteFileLoad(id);
	}
			
			
			
			
			
	
			
	}

