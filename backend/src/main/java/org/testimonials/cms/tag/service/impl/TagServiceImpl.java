package org.testimonials.cms.tag.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.product.repository.IProductRepository;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;
import org.testimonials.cms.tag.exception.TagNotFound;
import org.testimonials.cms.tag.mapper.TagMapper;
import org.testimonials.cms.tag.model.Tag;
import org.testimonials.cms.tag.repository.ITagRepository;
import org.testimonials.cms.tag.service.ITagService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements ITagService {
    private final ITagRepository tagRepository;
    private final IProductRepository productRepository;
    private final TagMapper tagMapper;

    private Map<UUID, Integer> buildUsageCountMap(UUID organizationId) {
        List<Object[]> results = productRepository.countProductsByTagIdGrouped(organizationId);
        Map<UUID, Integer> map = new HashMap<>();
        for (Object[] row : results) {
            map.put((UUID) row[0], ((Number) row[1]).intValue());
        }
        return map;
    }

    private TagResponseDTO toTagDTO(Tag tag, Map<UUID, Integer> countMap) {
        int count = countMap.getOrDefault(tag.getId(), 0);
        return tagMapper.toTagDTO(tag, count);
    }

    @Override
    @Transactional
    public TagResponseDTO createTag(CustomUserPrincipal customUserPrincipal, TagRequestDTO tagRequestDTO) {
        UUID orgId = customUserPrincipal.organizationId();
        Map<UUID, Integer> countMap = buildUsageCountMap(orgId);

        return tagRepository.findByNameAndOrganizationId(tagRequestDTO.name(), orgId)
                .map(tag -> toTagDTO(tag, countMap))
                .orElseGet(() -> {
                    Tag tag = tagMapper.toTag(tagRequestDTO);
                    tag.setOrganizationId(orgId);
                    Tag saved = tagRepository.save(tag);
                    return toTagDTO(saved, countMap);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TagResponseDTO> listAllTags(CustomUserPrincipal customUserPrincipal, Pageable pageable) {
        UUID orgId = customUserPrincipal.organizationId();
        Page<Tag> tagPage = tagRepository.findAll(pageable);
        Map<UUID, Integer> countMap = buildUsageCountMap(orgId);
        return tagPage.map(tag -> toTagDTO(tag, countMap));
    }

    @Override
    @Transactional(readOnly = true)
    public TagResponseDTO listTag(UUID idTag, UUID organizationId) {
        Tag tag = tagRepository.findById(idTag)
                .orElseThrow(() -> TagNotFound.of(idTag));
        Map<UUID, Integer> countMap = buildUsageCountMap(organizationId);
        return toTagDTO(tag, countMap);
    }

    @Override
    @Transactional
    public TagResponseDTO updateTag(UUID idTag, TagRequestDTO tagRequestDTO) {
        Tag tag = tagRepository.findById(idTag)
                .orElseThrow(() -> TagNotFound.of(idTag));
        UUID orgId = tag.getOrganizationId();
        Map<UUID, Integer> countMap = buildUsageCountMap(orgId);

        return tagRepository.findByNameAndOrganizationId(tagRequestDTO.name(), orgId)
                .filter(existing -> !existing.getId().equals(idTag))
                .map(t -> toTagDTO(t, countMap))
                .orElseGet(() -> {
                    tag.setName(tagRequestDTO.name());
                    Tag saved = tagRepository.save(tag);
                    return toTagDTO(saved, countMap);
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
