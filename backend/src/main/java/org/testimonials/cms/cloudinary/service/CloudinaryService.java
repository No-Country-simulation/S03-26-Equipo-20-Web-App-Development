package org.testimonials.cms.cloudinary.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.testimonials.cms.cloudinary.dto.CloudinaryUploadResponseDTO;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    // ==========================================
    // 1. SUBIR IMÁGENES
    // ==========================================
    @CircuitBreaker(name = "cloudinaryBreaker", fallbackMethod = "uploadImageFallback")
    @SuppressWarnings("unchecked")
    public CloudinaryUploadResponseDTO uploadImage(MultipartFile file) throws IOException {
        Map<String, Object> result = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "image"));
        return new CloudinaryUploadResponseDTO((String) result.get("public_id"), (String) result.get("secure_url"));
    }

    public CloudinaryUploadResponseDTO uploadImageFallback(MultipartFile file, Throwable t) {
        return new CloudinaryUploadResponseDTO(null, "https://midominio.com/assets/default-placeholder.png");
    }

    // ==========================================
    // 2. SUBIR VIDEOS
    // ==========================================
    @CircuitBreaker(name = "cloudinaryBreaker", fallbackMethod = "uploadVideoFallback")
    @SuppressWarnings("unchecked")
    public CloudinaryUploadResponseDTO uploadVideo(MultipartFile file) throws IOException {
        Map<String, Object> result = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));
        return new CloudinaryUploadResponseDTO((String) result.get("public_id"), (String) result.get("secure_url"));
    }

    public CloudinaryUploadResponseDTO uploadVideoFallback(MultipartFile file, Throwable t) {
        return new CloudinaryUploadResponseDTO(null, "https://midominio.com/assets/default-video.mp4");
    }

    // ==========================================
    // 3. SUBIR AUDIOS
    // ==========================================
    @CircuitBreaker(name = "cloudinaryBreaker", fallbackMethod = "uploadAudioFallback")
    @SuppressWarnings("unchecked")
    public CloudinaryUploadResponseDTO uploadAudio(MultipartFile file) throws IOException {
        // En Cloudinary el audio se procesa como "video" o "auto"
        Map<String, Object> result = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));
        return new CloudinaryUploadResponseDTO((String) result.get("public_id"), (String) result.get("secure_url"));
    }

    public CloudinaryUploadResponseDTO uploadAudioFallback(MultipartFile file, Throwable t) {
        return new CloudinaryUploadResponseDTO(null, "https://midominio.com/assets/default-audio.mp3");
    }

    // ==========================================
    // 4. ELIMINAR ARCHIVOS
    // ==========================================
    @CircuitBreaker(name = "cloudinaryBreaker", fallbackMethod = "deleteFileFallback")
    @SuppressWarnings("unchecked")
    public Map<String, Object> deleteFile(String publicId) throws IOException {
        // Por defecto Cloudinary busca imágenes. Si necesitas borrar videos/audios,
        // deberías pasar ObjectUtils.asMap("resource_type", "video")
        return (Map<String, Object>) cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public Map<String, Object> deleteFileFallback(String publicId, Throwable t) {
        return Map.of(
                "result", "fallback",
                "message", "No se pudo eliminar el archivo debido a un error o timeout en el servicio",
                "publicId", publicId
        );
    }
}
