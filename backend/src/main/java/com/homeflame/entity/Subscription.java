
package com.homeflame.entity;

import com.homeflame.dto.SubscriptionPlan;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private User chef;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionPlan planType;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private boolean active = true;
}
