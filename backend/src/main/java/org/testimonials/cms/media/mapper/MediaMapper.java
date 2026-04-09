package org.testimonials.cms.media.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.testimonials.cms.media.dto.MediaRequestDTO;
import org.testimonials.cms.media.dto.MediaResponseDTO;
import org.testimonials.cms.media.model.Media;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MediaMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "testimonial", ignore = true)
    @Mapping(target = "organizationId", ignore = true)
    @Mapping(target = "organization", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Media toMedia(MediaRequestDTO mediaRequestDTO);

    MediaResponseDTO toMediaDTO(Media media);

    List<MediaResponseDTO> toMediaDTO(List<Media> media);
}
