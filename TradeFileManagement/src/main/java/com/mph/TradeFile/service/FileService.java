package com.mph.TradeFile.service;

import java.time.LocalDate;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mph.TradeFile.Exception.ResourceNotFoundException;
import com.mph.TradeFile.dao.FileRepository;
import com.mph.TradeFile.model.FileLoad;
import com.mph.TradeFile.model.FileLoadRequestdto;
import com.mph.TradeFile.model.FileLoadResponsedto;
import com.mph.TradeFile.model.SearchCriteriadto;

@Service
public class FileService {
	@Autowired
	FileRepository fileLoadRepository;
	
	
	//Create Service
	
	public FileLoadResponsedto createFileLoad(FileLoadRequestdto fileLoadRequestDTO) {
		FileLoad file = new FileLoad();
		file.setLocalDate(LocalDate.now());
		file.setFileName(fileLoadRequestDTO.getFileName());
		file.setStatus(fileLoadRequestDTO.getStatus());
		file.setRecordCount(fileLoadRequestDTO.getRecordCount());
		file.setErrors(fileLoadRequestDTO.getErrors());
	    
		
		FileLoad saved= fileLoadRepository.save(file);
		return toResponseDTO(saved);
		
	}
	
	 // Read
    public FileLoadResponsedto getFileLoadById(Long id) {
        FileLoad file = fileLoadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FileLoad not found with ID: " + id));
        return toResponseDTO(file);
    }

    // Update
    public FileLoadResponsedto updateFileLoadStatus(Long id, String status) {
        FileLoad file = fileLoadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FileLoad not found with ID: " + id));
        file.setStatus(status);
        FileLoad updated = fileLoadRepository.save(file);
        return toResponseDTO(updated);
    }

    // Delete
    public void deleteFileLoad(Long id) {
        if (!fileLoadRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. FileLoad not found with ID: " + id);
        }
        fileLoadRepository.deleteById(id);
    }

    // Search
    public List<FileLoad> searchFileLoads(SearchCriteriadto criteria) {
    	
        return fileLoadRepository.getSearchDetails(
                criteria.getId(),
                criteria.getFileName(),
                criteria.getFromdate(),
                criteria.getTodate(),
                criteria.getStatus()
        );
    }
 
    
    //  To convert Entity to DTO
    private FileLoadResponsedto toResponseDTO(FileLoad file) {
        FileLoadResponsedto dto = new FileLoadResponsedto();
        System.out.println(file.getFileName());
        dto.setId(file.getId());
        dto.setFileName(file.getFileName());
        dto.setLocalDate(file.getLocalDate());
        dto.setStatus(file.getStatus());
        dto.setRecordCount(file.getRecordCount());
        dto.setErrors(file.getErrors());
        return dto;
    }

}
