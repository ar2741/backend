package com.example.rwtool.repo;


import com.example.rwtool.entity.AmlReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AmlReportRepo extends JpaRepository<AmlReport, Long> {
    List<AmlReport> findByUploadedBy(String uploadedBy);
}
