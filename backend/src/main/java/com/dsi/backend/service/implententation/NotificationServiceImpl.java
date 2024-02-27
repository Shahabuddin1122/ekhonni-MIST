package com.dsi.backend.service.implententation;

import com.dsi.backend.model.AppUser;
import com.dsi.backend.model.Message;
import com.dsi.backend.model.Notification;
import com.dsi.backend.repository.AppUserRepository;
import com.dsi.backend.repository.MessageRepository;
import com.dsi.backend.repository.NotificationRepository;
import com.dsi.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Override
    public Notification saveNotification(Notification notification) {
        Message message = notification.getMessage();
        messageRepository.save(message);
        AppUser receiver = appUserRepository.findByEmail(notification.getReceiver().getEmail());
        notification.setReceiver(receiver);
        notification.setNotificationTime(LocalDateTime.now());
        notification.setSeen(false);
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> fetchNotification(String email) {
        AppUser receiver = appUserRepository.findByEmail(email);
        return notificationRepository.findByReceiver(receiver);
    }

    @Override
    public String clearAllNotification(String email) {
        AppUser receiver = appUserRepository.findByEmail(email);
        List<Notification> notifications = notificationRepository.findByReceiver(receiver);
        notificationRepository.deleteAll(notifications);
        return "Deleted successfully";
    }




}
