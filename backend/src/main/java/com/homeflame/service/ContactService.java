package com.homeflame.service;

import com.homeflame.dto.ApiResponse;
import com.homeflame.entity.ContactMessage;
import com.homeflame.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ApiResponse<?> saveMessage(ContactMessage message) {
        ContactMessage saved = contactMessageRepository.save(message);
        return ApiResponse.success(saved, "Message sent successfully");
    }

    public ApiResponse<?> getAllMessages() {
        List<ContactMessage> messages = contactMessageRepository.findAll();
        return ApiResponse.success(messages, "Messages retrieved successfully");
    }
}
