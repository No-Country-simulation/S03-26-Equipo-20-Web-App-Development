-- V4__insert_default_products.sql
-- Insertar productos por defecto con sus tags relacionados a la organización CMS System

DO $$
DECLARE
    v_org_id UUID;
    v_user_id UUID;
BEGIN
    SELECT id INTO v_org_id FROM organizations WHERE name = 'CMS System';
    SELECT id INTO v_user_id FROM users WHERE email = 'admin@cms.com';

    IF v_org_id IS NULL OR v_user_id IS NULL THEN
        RAISE EXCEPTION 'Organization CMS System or User admin@cms.com not found. Run V3 first.';
    END IF;

    -- =============================================
    -- TAGS (33 unique tags)
    -- =============================================

    INSERT INTO tags (name, organization_id)
    SELECT v.name, v_org_id
    FROM (VALUES
              ('edtech'),
              ('lms'),
              ('cursos'),
              ('educacion'),
              ('bootcamp'),
              ('programacion'),
              ('fullstack'),
              ('carrera'),
              ('idiomas'),
              ('app'),
              ('movil'),
              ('aprendizaje'),
              ('data science'),
              ('certificacion'),
              ('analitica'),
              ('ia'),
              ('tutorias'),
              ('mentoria'),
              ('ux'),
              ('ui'),
              ('diseno'),
              ('curso'),
              ('entrevistas'),
              ('simulacion'),
              ('empleo'),
              ('microlearning'),
              ('skills'),
              ('marketing'),
              ('seo'),
              ('redes'),
              ('evaluaciones'),
              ('quizzes'),
              ('testing')
         ) AS v(name)
    ON CONFLICT (organization_id, name) DO NOTHING;

    -- =============================================
    -- PRODUCT 1: Plataforma de Cursos Online
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Plataforma de Cursos Online',
        'Sistema LMS para crear, gestionar y vender cursos en línea con seguimiento de estudiantes.',
        'https://www.enricgomez.com/wp-content/uploads/2021/02/online-courses.jpg',
        'lms_platform_001',
        'LMS-PLATFORM',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('edtech'), ('lms'), ('cursos'), ('educacion')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'LMS-PLATFORM'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 2: Bootcamp de Programación Fullstack
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Bootcamp de Programación Fullstack',
        'Programa intensivo para formar desarrolladores en tecnologías frontend y backend.',
        'https://swansoftwaresolutions.com/wp-content/uploads/2020/04/05.14.20-Meet-a-Full-Stack-Developer-Vlad-Ryba.jpg',
        'bootcamp_fullstack_001',
        'BOOTCAMP-FS',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('bootcamp'), ('programacion'), ('fullstack'), ('carrera')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'BOOTCAMP-FS'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 3: App de Aprendizaje de Idiomas
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'App de Aprendizaje de Idiomas',
        'Aplicación móvil para aprender idiomas con ejercicios interactivos y seguimiento personalizado.',
        'https://www.elcaribe.com.do/wp-content/uploads/2019/08/00841d92-1-aplicaciones-para-idiomas.jpg',
        'language_app_001',
        'LANG-APP',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('idiomas'), ('app'), ('movil'), ('aprendizaje')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'LANG-APP'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 4: Certificación en Data Science
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Certificación en Data Science',
        'Programa de certificación en análisis de datos, machine learning y visualización.',
        'https://www.cursosgis.com/wp-content/uploads/arcgis_data-science_cuadrada.jpg',
        'data_science_cert_001',
        'DATA-SCI',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('data science'), ('certificacion'), ('analitica'), ('ia')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'DATA-SCI'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 5: Plataforma de Tutorías en Línea
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Plataforma de Tutorías en Línea',
        'Servicio para conectar estudiantes con tutores especializados en diferentes materias.',
        'http://www.lees.com.ec/wp-content/uploads/2019/12/tutortias-asd-aasd.jpg',
        'tutoring_platform_001',
        'TUTORING-PLT',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('tutorias'), ('educacion'), ('mentoria')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'TUTORING-PLT'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 6: Curso de Diseño UX/UI
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Curso de Diseño UX/UI',
        'Curso práctico enfocado en experiencia de usuario y diseño de interfaces modernas.',
        'https://www.marindelafuente.com.ar/wp-content/uploads/2023/05/10-cursos-gratuitos-de-diseno-UX-696x400.webp',
        'ux_ui_course_001',
        'UXUI-COURSE',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('ux'), ('ui'), ('diseno'), ('curso')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'UXUI-COURSE'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 7: Simulador de Entrevistas Técnicas
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Simulador de Entrevistas Técnicas',
        'Herramienta para practicar entrevistas técnicas con feedback automatizado.',
        'https://jobcopilot.com/wp-content/uploads/2024/10/12.png',
        'interview_sim_001',
        'INTERVIEW-SIM',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('entrevistas'), ('simulacion'), ('empleo')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'INTERVIEW-SIM'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 8: Plataforma de Microlearning
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Plataforma de Microlearning',
        'Sistema de aprendizaje basado en cápsulas cortas para mejorar habilidades específicas.',
        'https://www.net-learning.com.ar/wp-content/uploads/2018/02/Microlearning.png',
        'microlearning_001',
        'MICRO-LEARN',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('microlearning'), ('educacion'), ('skills')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'MICRO-LEARN'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 9: Academia de Marketing Digital
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Academia de Marketing Digital',
        'Cursos y recursos para aprender SEO, redes sociales y publicidad digital.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxQ1BH5wVFEg397dpChaM6yHiQBa2WqBVKw&s',
        'marketing_academy_001',
        'MKT-ACADEMY',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('marketing'), ('seo'), ('redes')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'MKT-ACADEMY'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

    -- =============================================
    -- PRODUCT 10: Plataforma de Evaluaciones Online
    -- =============================================

    INSERT INTO products (name, description, picture, public_id, share_code, created_by, organization_id)
    VALUES (
        'Plataforma de Evaluaciones Online',
        'Herramienta para crear exámenes, quizzes y evaluaciones automatizadas.',
        'https://blog.pearsonlatam.com/hs-fs/hubfs/ventajas-examenes-online-a-distancia-escuelas-1.jpg?width=800&name=ventajas-examenes-online-a-distancia-escuelas-1.jpg',
        'exam_platform_001',
        'EXAM-PLT',
        v_user_id,
        v_org_id
    )
    ON CONFLICT (share_code) DO NOTHING;

    INSERT INTO product_tags (product_id, tag_id)
    SELECT p.id, t.id
    FROM products p
    CROSS JOIN (VALUES ('evaluaciones'), ('quizzes'), ('testing')) AS v(name)
    JOIN tags t ON t.name = v.name AND t.organization_id = p.organization_id
    WHERE p.share_code = 'EXAM-PLT'
      AND p.organization_id = v_org_id
    ON CONFLICT DO NOTHING;

END $$;
