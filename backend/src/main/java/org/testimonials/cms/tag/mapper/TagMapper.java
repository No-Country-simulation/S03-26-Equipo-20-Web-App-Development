package org.testimonials.cms.tag.mapper;

import org.mapstruct.Mapper;
import org.testimonials.cms.tag.dto.TagRequestDTO;
import org.testimonials.cms.tag.dto.TagResponseDTO;
import org.testimonials.cms.tag.model.Tag;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag toTag(TagRequestDTO tagRequestDTO);

    TagResponseDTO toTagDTO(Tag tag);

    List<TagResponseDTO> toTagDTO(List<Tag> tags);

    default TagResponseDTO toTagDTO(Tag tag, int usageCount) {
        tag.setUsageCount(usageCount);
        return toTagDTO(tag);
    }
}
