package com.example.rwtool.repo;


import com.example.rwtool.entity.DormantReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DormantReportRepo extends JpaRepository<DormantReport, Long> {
    List<DormantReport> findByUploadedBy(String uploadedBy);
}
