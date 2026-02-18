
package com.homeflame.controller;

import com.homeflame.dto.ApiResponse;
import com.homeflame.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/chef/analytics/{chefId}")
    public ResponseEntity<ApiResponse<?>> getChefAnalytics(@PathVariable Long chefId) {
        return ResponseEntity.ok(analyticsService.getChefAnalytics(chefId));
    }

    @GetMapping("/admin/reports/summary")
    public ResponseEntity<ApiResponse<?>> getAdminSummary() {
        return ResponseEntity.ok(analyticsService.getAdminReportSummary());
    }
}
