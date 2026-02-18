package com.homeflame.service;

import com.homeflame.dto.ApiResponse;
import com.homeflame.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final SubscriptionRepository subscriptionRepository;

    public ApiResponse<?> getChefAnalytics(Long chefId) {
        long totalSubscriptions = subscriptionRepository.findByChefId(chefId).size();
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("chefId", chefId);
        analytics.put("totalSubscriptions", totalSubscriptions);
        analytics.put("activeSubscriptions", totalSubscriptions);
        
        return ApiResponse.success(analytics, "Chef analytics retrieved successfully");
    }

    public ApiResponse<?> getAdminReportSummary() {
        long totalSubscriptions = subscriptionRepository.count();
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalSubscriptions", totalSubscriptions);
        summary.put("totalRevenue", totalSubscriptions * 100);
        
        return ApiResponse.success(summary, "Admin report summary retrieved successfully");
    }
}
