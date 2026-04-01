package org.testimonials.cms.global.client.cloudinary;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.testimonials.cms.global.client.cloudinary.dto.CloudinaryUploadResponseDTO;

@FeignClient(
        name = "cloudinary-client",
        url = "${cloudinary.api.url}",
        fallback = CloudinaryClientFallback.class
)
public interface ICloudinaryClient {

    @PostMapping(value = "/{cloud_name}/{resource_type}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CloudinaryUploadResponseDTO uploadMedia(
            @PathVariable("cloud_name") String cloudName,
            @PathVariable("resource_type") String resourceType,
            @RequestPart("file") MultipartFile file,
            @RequestPart("upload_preset") String uploadPreset
    );
}
