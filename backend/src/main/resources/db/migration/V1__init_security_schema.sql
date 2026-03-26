-- V1__init_security_schema.sql
-- Security and Organization schema for CMS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE membership_status AS ENUM ('ACTIVE', 'INVITED', 'SUSPENDED');
CREATE TYPE membership_type AS ENUM ('OWNER', 'ADMIN', 'STAFF');
CREATE TYPE http_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE');

-- =============================================
-- TABLES
-- =============================================

-- Modules table
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_name VARCHAR(255) NOT NULL UNIQUE,
    base_path VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Operations table
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

-- Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Granted permission (role-operation relationship)
CREATE TABLE granted_permission (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    operation_id UUID NOT NULL REFERENCES operations(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, operation_id)
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memberships table
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    status membership_status NOT NULL DEFAULT 'INVITED',
    type membership_type NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_organization UNIQUE (user_id, organization_id)
);

-- Membership roles (membership-role relationship)
CREATE TABLE membership_roles (
    membership_id UUID NOT NULL REFERENCES memberships(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (membership_id, role_id)
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_operations_module_id ON operations(module_id);
CREATE INDEX idx_granted_permission_role_id ON granted_permission(role_id);
CREATE INDEX idx_granted_permission_operation_id ON granted_permission(operation_id);
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_organization_id ON memberships(organization_id);
CREATE INDEX idx_membership_roles_membership_id ON membership_roles(membership_id);
CREATE INDEX idx_membership_roles_role_id ON membership_roles(role_id);

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
