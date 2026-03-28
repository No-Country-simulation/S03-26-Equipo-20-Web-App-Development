package org.testimonials.cms.global.client.cloudinary;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.testimonials.cms.global.client.cloudinary.dto.CloudinaryUploadResponseDTO;

@Component
public class CloudinaryClientFallback implements ICloudinaryClient {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryClientFallback.class);

    @Override
    public CloudinaryUploadResponseDTO uploadMedia(String cloudName, String resourceType, MultipartFile file, String uploadPreset) {
        logger.error("Cloudinary API is currently unavailable. Using fallback strategy for file: {}", file.getOriginalFilename());
        
        return CloudinaryUploadResponseDTO.builder()
                .publicId("fallback_image_id")
                // A generic placeholder or a controlled error value depending on requirements
                .secureUrl("https://res.cloudinary.com/demo/image/upload/v1/default_image.png")
                .build();
    }
}
