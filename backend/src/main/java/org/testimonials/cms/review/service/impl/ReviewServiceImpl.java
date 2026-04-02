package org.testimonials.cms.review.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.testimonials.cms.organization.model.Organization;
import org.testimonials.cms.review.dtos.EditReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewRequestDTO;
import org.testimonials.cms.review.dtos.ReviewResponseDTO;
import org.testimonials.cms.review.exception.ReviewAlreadyExists;
import org.testimonials.cms.review.exception.ReviewNotFound;
import org.testimonials.cms.review.exception.UserNotFound;
import org.testimonials.cms.review.mapper.ReviewMapper;
import org.testimonials.cms.review.model.Review;
import org.testimonials.cms.review.repository.IReviewRepository;
import org.testimonials.cms.review.service.IReviewService;
import org.testimonials.cms.security.model.CustomUserPrincipal;
import org.testimonials.cms.security.model.User;
import org.testimonials.cms.security.repository.IUserRepository;
import org.testimonials.cms.testimonial.exception.TestimonialNotFound;
import org.testimonials.cms.testimonial.model.Testimonial;
import org.testimonials.cms.testimonial.repository.ITestimonialRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements IReviewService {
    private final IReviewRepository reviewRepository;
    private final ITestimonialRepository testimonialRepository;

    private final ReviewMapper reviewMapper;

    @Override
    @Transactional
    public ReviewResponseDTO createReview(CustomUserPrincipal customUserPrincipal, ReviewRequestDTO reviewRequestDTO) {
        Testimonial testimonial = testimonialRepository.findById(reviewRequestDTO.testimonial())
                .orElseThrow(() -> TestimonialNotFound.of(reviewRequestDTO.testimonial()));
        if (reviewRepository.existsByTestimonialAndReviewer(testimonial, customUserPrincipal.user()))
            throw ReviewAlreadyExists.of(testimonial.getId());

        Review review = reviewMapper.toReview(reviewRequestDTO);
        review.setTestimonial(testimonial);
        review.setReviewer(customUserPrincipal.user());
        review.setOrganization(new Organization(customUserPrincipal.organizationId()));
        Review newReview = reviewRepository.save(review);
        return reviewMapper.toReviewDTO(newReview);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponseDTO> listAllReviews() {
        return reviewMapper.toReviewListDTOs(reviewRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewResponseDTO listReview(UUID idReview) {
        Optional<Review> reviewFound = reviewRepository.findById(idReview);

        if (reviewFound.isEmpty()) throw ReviewNotFound.of(idReview);

        return reviewMapper.toReviewDTO(reviewRepository.getReferenceById(idReview));
    }

    @Override
    @Transactional
    public ReviewResponseDTO updateReview(UUID idReview, EditReviewRequestDTO editReviewRequestDTO) {
        Optional<Review> reviewFound = reviewRepository.findById(idReview);

        if (reviewFound.isEmpty()) throw ReviewNotFound.of(idReview);

        Review reviewNotModified = reviewRepository.getReferenceById(idReview);

        if (editReviewRequestDTO.comment() != null) reviewNotModified.setComment(editReviewRequestDTO.comment());

        Review reviewModified = reviewRepository.save(reviewNotModified);

        return reviewMapper.toReviewDTO(reviewModified);
    }

    @Override
    @Transactional
    public void deleteReview(UUID idReview) {
        Optional<Review> reviewFound = reviewRepository.findById(idReview);

        if (reviewFound.isEmpty()) throw ReviewNotFound.of(idReview);

        reviewRepository.deleteById(idReview);
    }
}
