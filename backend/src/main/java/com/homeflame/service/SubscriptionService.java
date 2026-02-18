package com.homeflame.service;

import com.homeflame.dto.ApiResponse;
import com.homeflame.dto.SubscriptionRequest;
import com.homeflame.entity.Subscription;
import com.homeflame.entity.User;
import com.homeflame.repository.SubscriptionRepository;
import com.homeflame.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public ApiResponse<?> createSubscription(SubscriptionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElse(null);
        User chef = userRepository.findById(request.getChefId())
                .orElse(null);

        if (user == null || chef == null) {
            return ApiResponse.error(404, "User or Chef not found");
        }

        Subscription subscription = Subscription.builder()
                .user(user)
                .chef(chef)
                .planType(request.getPlanType())
                .startDate(LocalDateTime.now())
                .active(true)
                .build();

        subscriptionRepository.save(subscription);
        return ApiResponse.success(subscription, "Subscription created successfully");
    }

    public ApiResponse<?> getSubscriptionsByUserId(Long userId) {
        List<Subscription> subscriptions = subscriptionRepository.findByUserId(userId);
        return ApiResponse.success(subscriptions, "Subscriptions retrieved successfully");
    }

    public ApiResponse<?> getSubscriptionsByChefId(Long chefId) {
        List<Subscription> subscriptions = subscriptionRepository.findByChefId(chefId);
        return ApiResponse.success(subscriptions, "Subscriptions retrieved successfully");
    }
}
