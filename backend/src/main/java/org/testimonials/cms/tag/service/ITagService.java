package org.testimonials.cms.tag.service;

import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ITagService {
    TagResponseDTO createTag(CustomUserPrincipal customUserPrincipal, TagRequestDTO tagRequestDTO);
    List<TagResponseDTO> listAllTags();
    TagResponseDTO listTag(UUID idTag);
    TagResponseDTO updateTag(UUID idTag, TagRequestDTO tagRequestDTO);
    void deleteTag(UUID idTag);
}
