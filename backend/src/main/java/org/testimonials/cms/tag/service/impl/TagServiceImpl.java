package org.testimonials.cms.tag.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements ITagService {
    private final ITagRepository tagRepository;
    private final TagMapper tagMapper;

    private TagResponseDTO toTagDTO(Tag tag, Map<UUID, Integer> countMap) {
        int count = countMap.getOrDefault(tag.getId(), 0);
        return tagMapper.toTagDTO(tag, count);
    }

    @Override
    @Transactional
    public TagResponseDTO createTag(CustomUserPrincipal user, TagRequestDTO dto) {
        UUID orgId = user.organizationId();

        return tagRepository.findByNameWithCount(dto.name(), orgId)
                .orElseGet(() -> {
                    Tag tag = tagMapper.toTag(dto);
                    tag.setOrganizationId(orgId);
                    Tag saved = tagRepository.save(tag);

                    return tagMapper.toTagDTO(saved, 0);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TagResponseDTO> listAllTags(CustomUserPrincipal customUserPrincipal, Pageable pageable) {
        return tagRepository.findAllWithCount(customUserPrincipal.organizationId(),pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagResponseDTO> findTopTags(UUID organizationId, int limit) {
        Pageable pageable = org.springframework.data.domain.PageRequest.of(0, limit);
        return tagRepository.findTopTagsOrderedByCount(organizationId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public TagResponseDTO listTag(UUID idTag, UUID organizationId) {
        return tagRepository.findByIdWithCount(idTag, organizationId)
                .orElseThrow(() -> TagNotFound.of(idTag));
    }

    @Override
    @Transactional
    public TagResponseDTO updateTag(UUID idTag, TagRequestDTO dto) {

        Tag tag = tagRepository.findById(idTag)
                .orElseThrow(() -> TagNotFound.of(idTag));
        UUID orgId = tag.getOrganizationId();
        return tagRepository.findByNameWithCount(dto.name(), orgId)
                .filter(existing -> !existing.id().equals(idTag))
                .orElseGet(() -> {
                    tag.setName(dto.name());
                    Tag saved = tagRepository.save(tag);
                    return tagRepository.findByIdWithCount(saved.getId(), orgId)
                            .orElseThrow();
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
