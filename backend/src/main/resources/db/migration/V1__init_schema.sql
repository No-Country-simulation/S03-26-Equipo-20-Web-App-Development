-- V1__init_schema.sql
-- Complete schema for CMS - All tables, enums, indexes and triggers

-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE membership_status AS ENUM ('ACTIVE', 'INVITED', 'SUSPENDED');
CREATE TYPE membership_type AS ENUM ('OWNER', 'ADMIN', 'STAFF');
CREATE TYPE http_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE');
CREATE TYPE media_type AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');
CREATE TYPE media_provider AS ENUM ('YOUTUBE', 'CLOUDINARY');
CREATE TYPE review_status AS ENUM ('APPROVED', 'REJECTED');
CREATE TYPE testimonial_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PUBLISHED');

-- =============================================
-- TABLES (in dependency order)
-- =============================================

-- 1. Users
CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Organizations
CREATE TABLE organizations (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               name VARCHAR(255) NOT NULL,
                               logo VARCHAR(500),
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Visitors
CREATE TABLE visitors (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          name VARCHAR(255),
                          email VARCHAR(255),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Modules
CREATE TABLE modules (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         module_name VARCHAR(255) NOT NULL UNIQUE,
                         base_path VARCHAR(255) NOT NULL UNIQUE,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Operations
CREATE TABLE operations (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            name VARCHAR(255) NOT NULL UNIQUE,
                            http_method http_method NOT NULL,
                            path VARCHAR(500),
                            permit_all BOOLEAN NOT NULL DEFAULT FALSE,
                            module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Roles
CREATE TABLE roles (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       role_name VARCHAR(100) NOT NULL UNIQUE,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Granted Permission (role-operation relationship)
CREATE TABLE granted_permission (
                                    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
                                    operation_id UUID NOT NULL REFERENCES operations(id) ON DELETE CASCADE,
                                    PRIMARY KEY (role_id, operation_id)
);

-- 8. Memberships
CREATE TABLE memberships (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                             status membership_status NOT NULL DEFAULT 'INVITED',
                             type membership_type NOT NULL,
                             joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             CONSTRAINT unique_user_organization UNIQUE (user_id, organization_id)
);

-- 9. Membership Roles (membership-role relationship)
CREATE TABLE membership_roles (
                                  membership_id UUID NOT NULL REFERENCES memberships(id) ON DELETE CASCADE,
                                  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
                                  PRIMARY KEY (membership_id, role_id)
);

-- 10. Products
CREATE TABLE products (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          name VARCHAR(255) NOT NULL,
                          description VARCHAR(1000),
                          picture VARCHAR(500),
                          public_id VARCHAR(255),
                          share_code VARCHAR(255) NOT NULL,
                          created_by UUID REFERENCES users(id) ON DELETE SET NULL,
                          organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT unique_organization_share_code UNIQUE (organization_id, share_code)
);

-- 11. Tags
CREATE TABLE tags (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      name VARCHAR(255) NOT NULL,
                      organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      CONSTRAINT unique_organization_name UNIQUE (organization_id, name)
);

-- 12. Product Tags (product-tag relationship)
CREATE TABLE product_tags (
                              product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                              tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
                              PRIMARY KEY (product_id, tag_id)
);

-- 13. Testimonials
CREATE TABLE testimonials (
                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              title VARCHAR(255) NOT NULL,
                              content VARCHAR(1000),
                              status testimonial_status DEFAULT 'PENDING',
                              visitor_id UUID REFERENCES visitors(id) ON DELETE SET NULL,
                              organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. Reviews
CREATE TABLE reviews (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         comment TEXT,
                         status review_status DEFAULT 'APPROVED',
                         reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         testimonial_id UUID REFERENCES testimonials(id) ON DELETE SET NULL,
                         organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT unique_testimonial_reviewer UNIQUE (testimonial_id, reviewer_id)
);

-- 15. Medias
CREATE TABLE medias (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        type media_type NOT NULL,
                        provider media_provider NOT NULL,
                        url VARCHAR(500) NOT NULL,
                        public_id VARCHAR(255),
                        thumbnail_url VARCHAR(500),
                        duration INTEGER,
                        testimonial_id UUID REFERENCES testimonials(id) ON DELETE SET NULL,
                        organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES
-- =============================================

-- Operations indexes
CREATE INDEX idx_operations_module_id ON operations(module_id);

-- Granted permission indexes
CREATE INDEX idx_granted_permission_role_id ON granted_permission(role_id);
CREATE INDEX idx_granted_permission_operation_id ON granted_permission(operation_id);

-- Memberships indexes
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_organization_id ON memberships(organization_id);

-- Membership roles indexes
CREATE INDEX idx_membership_roles_membership_id ON membership_roles(membership_id);
CREATE INDEX idx_membership_roles_role_id ON membership_roles(role_id);

-- Products indexes
CREATE INDEX idx_products_organization_id ON products(organization_id);

-- Tags indexes
CREATE INDEX idx_tags_organization_id ON tags(organization_id);

-- Product tags indexes
CREATE INDEX idx_product_tags_tag_id ON product_tags(tag_id);

-- Testimonials indexes
CREATE INDEX idx_testimonials_organization_id ON testimonials(organization_id);

-- Reviews indexes
CREATE INDEX idx_reviews_organization_id ON reviews(organization_id);
CREATE INDEX idx_reviews_testimonial_id ON reviews(testimonial_id);

-- Medias indexes
CREATE INDEX idx_medias_organization_id ON medias(organization_id);
CREATE INDEX idx_medias_testimonial_id ON medias(testimonial_id);

-- =============================================
-- TRIGGERS FOR updated_at
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Users trigger
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Organizations trigger
CREATE TRIGGER trg_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Modules trigger
CREATE TRIGGER trg_modules_updated_at
    BEFORE UPDATE ON modules
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Operations trigger
CREATE TRIGGER trg_operations_updated_at
    BEFORE UPDATE ON operations
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Roles trigger
CREATE TRIGGER trg_roles_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Products trigger
CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tags trigger
CREATE TRIGGER trg_tags_updated_at
    BEFORE UPDATE ON tags
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Testimonials trigger
CREATE TRIGGER trg_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Reviews trigger
CREATE TRIGGER trg_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();