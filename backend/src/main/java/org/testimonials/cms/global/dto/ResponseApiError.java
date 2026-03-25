package org.testimonials.cms.global.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ResponseApiError(String backendMessage,
                               String message,
                               String url,
                               String method,
                               @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
                               LocalDateTime localDateTime) {
}
