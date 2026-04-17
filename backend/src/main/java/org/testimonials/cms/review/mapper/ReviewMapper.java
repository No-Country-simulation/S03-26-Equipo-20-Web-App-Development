package org.testimonials.cms.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.review.model.Review;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(target = "testimonial", ignore = true)
    @Mapping(target = "reviewer", ignore = true)
    Review toReview(ReviewRequestDTO dto);

    @Mapping(target = "testimonial", source = "testimonial.id")
    @Mapping(target = "reviewer", source = "reviewer.id")
    ReviewResponseDTO toReviewDTO(Review review);

    List<ReviewResponseDTO> toReviewListDTOs(List<Review> reviews);
}
