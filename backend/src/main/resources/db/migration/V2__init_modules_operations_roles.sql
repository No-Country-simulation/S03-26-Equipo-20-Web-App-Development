-- V2__init_modules_operations_roles.sql
-- Production-ready: no hardcoded UUIDs, deterministic, idempotent

-- =============================================
-- MODULES
-- =============================================

INSERT INTO modules (module_name, base_path)
SELECT v.module_name, v.base_path
FROM (
         VALUES
             ('auth', '/api/v1/auth'),
             ('membership', '/api/v1/membership'),
             ('organization', '/api/v1/organizations'),
             ('product', '/api/v1/products'),
             ('tag', '/api/v1/tags'),
             ('testimonial', '/api/v1/testimonials'),
             ('review', '/api/v1/reviews'),
             ('media', '/api/v1/medias'),
             ('visitor', '/api/v1/visitors'),
             ('swagger', '/docs'),
             ('actuator', '/actuator')
     ) AS v(module_name, base_path)
ON CONFLICT (module_name) DO NOTHING;


-- =============================================
-- OPERATIONS
-- =============================================

INSERT INTO operations (name, http_method, path, permit_all, module_id)
SELECT v.name, v.http_method::http_method, v.path, v.permit_all, m.id
FROM (
         VALUES
             -- AUTH
             ('auth-login','POST','/login',true,'auth'),
             ('auth-register-org','POST','/register-org',true,'auth'),
             ('auth-me','GET','/me',false,'auth'),
             ('auth-register-members','POST','/register-members',false,'auth'),
             ('auth-logout','POST','/logout',false,'auth'),

             -- MEMBERSHIP
             ('membership-types','GET','/types',false,'membership'),

             -- ORGANIZATION
             ('organization-getAll','GET','/getAll',false,'organization'),
             ('organization-getOnly','GET','/getOnly',false,'organization'),
             ('organization-update','PUT','/',false,'organization'),
             ('organization-delete','DELETE','/',false,'organization'),

             -- PRODUCT
             ('product-create','POST','/register',false,'product'),
             ('product-list','GET','/',false,'product'),
             ('product-get','GET','/*',false,'product'),
             ('product-update','PUT','/*',false,'product'),
             ('product-delete','DELETE','/*',false,'product'),

             -- TAG
             ('tag-create','POST','/register',false,'tag'),
             ('tag-list','GET','/',false,'tag'),
             ('tag-get','GET','/*',false,'tag'),
             ('tag-update','PUT','/*',false,'tag'),
             ('tag-delete','DELETE','/*',false,'tag'),

             -- TESTIMONIAL
             ('testimonial-create','POST','/register',false,'testimonial'),
             ('testimonial-list','GET','/',false,'testimonial'),
             ('testimonial-get','GET','/*',false,'testimonial'),
             ('testimonial-update','PUT','/*',false,'testimonial'),
             ('testimonial-delete','DELETE','/*',false,'testimonial'),

             -- REVIEW
             ('review-create','POST','/register',false,'review'),
             ('review-list','GET','/',false,'review'),
             ('review-get','GET','/*',false,'review'),
             ('review-update','PUT','/*',false,'review'),
             ('review-delete','DELETE','/*',false,'review'),

             -- MEDIA
             ('media-list','GET','/',false,'media'),
             ('media-get','GET','/*',false,'media'),

             -- VISITOR
             ('visitor-list','GET','/',false,'visitor'),
             ('visitor-get','GET','/*',false,'visitor'),
             ('visitor-update','PUT','/*',false,'visitor'),
             ('visitor-delete','DELETE','/*',false,'visitor'),

             -- SWAGGER (all permit_all = true)
             ('swagger-ui-html','GET','/swagger-ui/index.html',true,'swagger'),
             ('swagger-ui-css','GET','/swagger-ui/swagger-ui.css',true,'swagger'),
             ('swagger-ui-favicon','GET','/swagger-ui/favicon-32x32.png',true,'swagger'),
             ('swagger-ui-bundle','GET','/swagger-ui/swagger-ui-bundle.js',true,'swagger'),
             ('swagger-ui-standalone','GET','/swagger-ui/swagger-ui-standalone-preset.js',true,'swagger'),
             ('swagger-initializer','GET','/swagger-ui/swagger-initializer.js',true,'swagger'),
             ('swagger-config','GET','/v3/api-docs/swagger-config',true,'swagger'),
             ('api-docs','GET','/v3/api-docs',true,'swagger'),

             -- ACTUATOR (permit_all = false)
             ('actuator-root','GET','/',false,'actuator'),
             ('actuator-info','GET','/info',false,'actuator'),
             ('actuator-health','GET','/health',false,'actuator')

     ) AS v(name, http_method, path, permit_all, module_name)
         JOIN modules m ON m.module_name = v.module_name
ON CONFLICT (name) DO NOTHING;


-- =============================================
-- ROLES
-- =============================================

INSERT INTO roles (role_name)
SELECT v.role_name
FROM (
         VALUES
             ('CMS_ADMIN'),
             ('OWNER'),
             ('ADMIN'),
             ('STAFF')
     ) AS v(role_name)
ON CONFLICT (role_name) DO NOTHING;


-- =============================================
-- GRANTED PERMISSIONS
-- =============================================

INSERT INTO granted_permission (role_id, operation_id)
SELECT r.id, o.id
FROM (
         VALUES
             -- CMS_ADMIN (ALL - excluding permit_all endpoints)
             ('CMS_ADMIN', ARRAY[
                 'auth-me','auth-register-members','auth-logout',
                 'membership-types',
                 'organization-getAll','organization-getOnly','organization-update','organization-delete',
                 'product-create','product-list','product-get','product-update','product-delete',
                 'tag-create','tag-list','tag-get','tag-update','tag-delete',
                 'testimonial-create','testimonial-list','testimonial-get','testimonial-update','testimonial-delete',
                 'review-create','review-list','review-get','review-update','review-delete',
                 'media-list','media-get',
                 'visitor-list','visitor-get','visitor-update','visitor-delete',
                 'actuator-root','actuator-info','actuator-health'
                 ]),

             -- OWNER (excluding permit_all endpoints)
             ('OWNER', ARRAY[
                 'auth-me','auth-register-members','auth-logout',
                 'membership-types',
                 'organization-getOnly','organization-update','organization-delete',
                 'product-create','product-list','product-get','product-update','product-delete',
                 'tag-create','tag-list','tag-get','tag-update','tag-delete',
                 'testimonial-create','testimonial-list','testimonial-get','testimonial-update','testimonial-delete',
                 'review-create','review-list','review-get','review-update','review-delete',
                 'media-list','media-get',
                 'visitor-list','visitor-get','visitor-update','visitor-delete',
                 'actuator-root','actuator-info','actuator-health'
                 ]),

             -- ADMIN (excluding permit_all endpoints)
             ('ADMIN', ARRAY[
                 'auth-me','auth-register-members','auth-logout',
                 'membership-types',
                 'organization-getOnly','organization-update',
                 'product-create','product-list','product-get','product-update','product-delete',
                 'tag-create','tag-list','tag-get','tag-update','tag-delete',
                 'testimonial-create','testimonial-list','testimonial-get','testimonial-update','testimonial-delete',
                 'review-create','review-list','review-get','review-update','review-delete',
                 'media-list','media-get',
                 'visitor-list','visitor-get','visitor-update','visitor-delete',
                 'actuator-root','actuator-info','actuator-health'
                 ]),

             -- STAFF (excluding permit_all endpoints)
             ('STAFF', ARRAY[
                 'auth-me','auth-logout',
                 'product-create','product-list','product-get',
                 'tag-create','tag-list','tag-get',
                 'testimonial-create','testimonial-list','testimonial-get',
                 'review-create','review-list','review-get',
                 'media-list','media-get',
                 'visitor-list','visitor-get',
                 'actuator-root','actuator-info','actuator-health'
                 ])

     ) AS v(role_name, operation_names)
         JOIN roles r ON r.role_name = v.role_name
         JOIN LATERAL unnest(v.operation_names) AS op_name(name) ON true
         JOIN operations o ON o.name = op_name.name
ON CONFLICT DO NOTHING;