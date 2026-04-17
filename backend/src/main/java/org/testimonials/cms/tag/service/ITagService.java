package org.testimonials.cms.tag.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ITagService {
    TagResponseDTO createTag(CustomUserPrincipal customUserPrincipal, TagRequestDTO tagRequestDTO);
    Page<TagResponseDTO> listAllTags(CustomUserPrincipal customUserPrincipal, Pageable pageable);
    List<TagResponseDTO> findTopTags(UUID organizationId, int limit);
    TagResponseDTO listTag(UUID idTag, UUID organizationId);
    TagResponseDTO updateTag(UUID idTag, TagRequestDTO tagRequestDTO);
    void deleteTag(UUID idTag);
}
