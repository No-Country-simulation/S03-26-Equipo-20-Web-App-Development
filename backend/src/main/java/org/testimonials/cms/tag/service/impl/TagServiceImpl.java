package org.testimonials.cms.tag.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;
import org.testimonials.cms.tag.exception.TagNotFound;
import org.testimonials.cms.tag.mapper.TagMapper;
import org.testimonials.cms.tag.model.Tag;
import org.testimonials.cms.tag.repository.ITagRepository;
import org.testimonials.cms.tag.service.ITagService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements ITagService {
    private final ITagRepository tagRepository;
    private final TagMapper tagMapper;

    @Override
    @Transactional
    public TagResponseDTO createTag(CustomUserPrincipal customUserPrincipal, TagRequestDTO tagRequestDTO) {
        return tagRepository.findByNameAndOrganizationId(tagRequestDTO.name(), customUserPrincipal.organizationId())
                .map(tagMapper::toTagDTO)
                .orElseGet(() -> {
                    Tag tag = tagMapper.toTag(tagRequestDTO);
                    tag.setOrganizationId(customUserPrincipal.organizationId());
                    return tagMapper.toTagDTO(tagRepository.save(tag));
                });
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagResponseDTO> listAllTags() {
        return tagMapper.toTagDTO(tagRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public TagResponseDTO listTag(UUID idTag) {
        return tagRepository.findById(idTag)
                .map(tagMapper::toTagDTO)
                .orElseThrow(() -> TagNotFound.of(idTag));
    }

    @Override
    @Transactional
    public TagResponseDTO updateTag(UUID idTag, TagRequestDTO tagRequestDTO) {
        Tag tag = tagRepository.findById(idTag)
                .orElseThrow(() -> TagNotFound.of(idTag));

        return tagRepository.findByNameAndOrganizationId(tagRequestDTO.name(), tag.getOrganizationId())
                .filter(existing -> !existing.getId().equals(idTag))
                .map(tagMapper::toTagDTO)
                .orElseGet(() -> {
                    tag.setName(tagRequestDTO.name());
                    return tagMapper.toTagDTO(tagRepository.save(tag));
                });
    }

    @Override
    @Transactional
    public void deleteTag(UUID idTag) {
        if (tagRepository.findById(idTag).isEmpty()) {
            throw TagNotFound.of(idTag);
        }
        tagRepository.deleteById(idTag);
    }
}
