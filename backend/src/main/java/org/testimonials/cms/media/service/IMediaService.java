package org.testimonials.cms.media.service;

import org.testimonials.cms.media.dto.MediaRequestDTO;
import org.testimonials.cms.media.dto.MediaResponseDTO;
import org.testimonials.cms.security.model.CustomUserPrincipal;

import java.util.List;
import java.util.UUID;

public interface IMediaService {
    MediaResponseDTO createMedia(CustomUserPrincipal customUserPrincipal, MediaRequestDTO mediaRequestDTO);
    List<MediaResponseDTO> listAllMedias();
    MediaResponseDTO listMedia(UUID idMedia);
    MediaResponseDTO updateMedia(UUID idMedia, MediaRequestDTO mediaRequestDTO);
    void deleteMedia(UUID idMedia);
}
