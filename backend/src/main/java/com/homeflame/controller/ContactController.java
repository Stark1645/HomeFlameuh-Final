
package com.homeflame.controller;

import com.homeflame.dto.ApiResponse;
import com.homeflame.entity.ContactMessage;
import com.homeflame.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> sendMessage(@Valid @RequestBody ContactMessage message) {
        return ResponseEntity.ok(contactService.saveMessage(message));
    }

    @GetMapping("/admin/messages")
    public ResponseEntity<ApiResponse<?>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
