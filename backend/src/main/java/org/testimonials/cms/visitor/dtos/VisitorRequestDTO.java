package org.testimonials.cms.visitor.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitorRequestDTO {
    @NotBlank(message = "Name is required")
    private String name;
    @Email
    @NotBlank(message = "email is required")
    private String email;
}
