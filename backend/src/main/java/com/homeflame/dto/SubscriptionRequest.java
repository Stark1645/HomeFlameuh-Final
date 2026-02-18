package com.homeflame.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubscriptionRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long chefId;

    @NotNull
    private SubscriptionPlan planType;
}
