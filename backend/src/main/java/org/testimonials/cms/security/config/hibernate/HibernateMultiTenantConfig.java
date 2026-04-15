package org.testimonials.cms.security.config.hibernate;

import org.springframework.boot.hibernate.autoconfigure.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HibernateMultiTenantConfig {

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(
            TenantIdentifierResolver tenantIdentifierResolver) {

        return properties -> {
            properties.put("hibernate.multiTenancy", "DISCRIMINATOR");
            properties.put("hibernate.tenant_identifier_resolver", tenantIdentifierResolver);
        };
    }
}
