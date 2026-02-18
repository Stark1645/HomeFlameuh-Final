
package com.homeflame.controller;

import com.homeflame.dto.ApiResponse;
import com.homeflame.dto.SubscriptionRequest;
import com.homeflame.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> subscribe(@Valid @RequestBody SubscriptionRequest request) {
        return ResponseEntity.ok(subscriptionService.createSubscription(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<?>> getUserSubscriptions(@PathVariable Long userId) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionsByUserId(userId));
    }

    @GetMapping("/chef/{chefId}")
    public ResponseEntity<ApiResponse<?>> getChefSubscriptions(@PathVariable Long chefId) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionsByChefId(chefId));
    }
}
