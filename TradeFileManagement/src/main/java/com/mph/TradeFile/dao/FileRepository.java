package com.mph.TradeFile.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mph.TradeFile.model.FileLoad;

public interface FileRepository extends JpaRepository<FileLoad,Long>{
	@Query(value="SELECT * FROM file_load WHERE (:id IS NULL OR id=:id) "
	   		+ "AND (:filename is NULL or filename LIKE :filename) "
	   		+"AND ((:fromdate IS NULL OR localdate >= :fromdate) AND (:todate IS NULL OR localdate <= :todate))"
	   		+ "AND (:status is NULL or status LIKE :status)",nativeQuery=true)
	public List<FileLoad> getSearchDetails(@Param("id") Long id,@Param("filename") String filename,
			@Param("fromdate") Date fromDate,@Param("todate") Date toDate,@Param("status") String status);


}
