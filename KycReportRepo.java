package com.example.rwtool.repo;

import com.example.rwtool.entity.KycReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KycReportRepo extends JpaRepository<KycReport, Long> {
    List<KycReport> findByUploadedBy(String uploadedBy);
}
