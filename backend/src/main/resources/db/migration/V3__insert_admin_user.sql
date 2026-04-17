-- V3__insert_admin_user.sql
-- Insertar usuario global admin con organización, membresía y rol CMS_ADMIN

-- =============================================
-- INSERTAR ORGANIZACIÓN CMS SYSTEM
-- =============================================

INSERT INTO organizations (name)
VALUES ('CMS System')
ON CONFLICT DO NOTHING;


-- =============================================
-- INSERTAR USUARIO ADMIN
-- =============================================

INSERT INTO users (name, email, password)
VALUES ('admin', 'admin@cms.com', '{noop}pon_tu_contraseña_aqui')
ON CONFLICT (email) DO NOTHING;


-- =============================================
-- INSERTAR MEMBERSHIP OWNER
-- =============================================

INSERT INTO memberships (user_id, organization_id, type, status)
SELECT u.id, o.id, 'OWNER'::membership_type, 'ACTIVE'::membership_status
FROM users u, organizations o
WHERE u.email = 'admin@cms.com'
  AND o.name = 'CMS System'
ON CONFLICT DO NOTHING;


-- =============================================
-- INSERTAR MEMBERSHIP_ROLES (liga membership -> CMS_ADMIN)
-- =============================================

INSERT INTO membership_roles (membership_id, role_id)
SELECT m.id, r.id
FROM memberships m
         JOIN users u ON u.id = m.user_id
         JOIN organizations o ON o.id = m.organization_id
         JOIN roles r ON r.role_name = 'CMS_ADMIN'
WHERE u.email = 'admin@cms.com'
  AND o.name = 'CMS System'
ON CONFLICT DO NOTHING;