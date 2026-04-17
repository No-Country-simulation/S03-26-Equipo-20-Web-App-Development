-- V5__insert_testimonials_examples.sql
-- Insertar ejemplos de testimonios, visitantes y medios relacionados

DO $$
DECLARE
    v_org_id UUID;
    v_admin_user_id UUID;

    -- Products
    v_product_lms UUID;
    v_product_bootcamp UUID;
    v_product_lang_app UUID;
    v_product_data_sci UUID;
    v_product_tutoring UUID;
    v_product_ux_ui UUID;
    v_product_interview UUID;
    v_product_microlearn UUID;
    v_product_mkt_academy UUID;
    v_product_exam_plt UUID;

    -- Visitors
    v_visitor_1 UUID;
    v_visitor_2 UUID;
    v_visitor_3 UUID;
    v_visitor_4 UUID;
    v_visitor_5 UUID;

    -- Testimonials IDs
    v_testimonial_1 UUID;
    v_testimonial_2 UUID;
    v_testimonial_3 UUID;
    v_testimonial_4 UUID;
    v_testimonial_5 UUID;
    v_testimonial_6 UUID;
    v_testimonial_7 UUID;
    v_testimonial_8 UUID;
    v_testimonial_9 UUID;
    v_testimonial_10 UUID;
    v_testimonial_11 UUID;
    v_testimonial_12 UUID;
    v_testimonial_13 UUID;
    v_testimonial_14 UUID;
    v_testimonial_15 UUID;
BEGIN
    -- Get organization
    SELECT id INTO v_org_id FROM organizations WHERE name = 'CMS System';
    SELECT id INTO v_admin_user_id FROM users WHERE email = 'admin@cms.com';

    -- Get products
    SELECT id INTO v_product_lms FROM products WHERE share_code = 'LMS-PLATFORM' AND organization_id = v_org_id;
    SELECT id INTO v_product_bootcamp FROM products WHERE share_code = 'BOOTCAMP-FS' AND organization_id = v_org_id;
    SELECT id INTO v_product_lang_app FROM products WHERE share_code = 'LANG-APP' AND organization_id = v_org_id;
    SELECT id INTO v_product_data_sci FROM products WHERE share_code = 'DATA-SCI' AND organization_id = v_org_id;
    SELECT id INTO v_product_tutoring FROM products WHERE share_code = 'TUTORING-PLT' AND organization_id = v_org_id;
    SELECT id INTO v_product_ux_ui FROM products WHERE share_code = 'UXUI-COURSE' AND organization_id = v_org_id;
    SELECT id INTO v_product_interview FROM products WHERE share_code = 'INTERVIEW-SIM' AND organization_id = v_org_id;
    SELECT id INTO v_product_microlearn FROM products WHERE share_code = 'MICRO-LEARN' AND organization_id = v_org_id;
    SELECT id INTO v_product_mkt_academy FROM products WHERE share_code = 'MKT-ACADEMY' AND organization_id = v_org_id;
    SELECT id INTO v_product_exam_plt FROM products WHERE share_code = 'EXAM-PLT' AND organization_id = v_org_id;

    IF v_org_id IS NULL OR v_admin_user_id IS NULL THEN
        RAISE EXCEPTION 'Organization CMS System or User admin@cms.com not found. Run V3 and V4 first.';
    END IF;

    -- =============================================
    -- VISITORS (5 visitors)
    -- =============================================

    INSERT INTO visitors (name, email)
    VALUES
        ('María González', 'maria.gonzalez@email.com'),
        ('Carlos Ramírez', 'carlos.ramirez@email.com'),
        ('Ana López', 'ana.lopez@email.com'),
        ('Pedro Martínez', 'pedro.martinez@email.com'),
        ('Laura Fernández', 'laura.fernandez@email.com');

    SELECT id INTO v_visitor_1 FROM visitors WHERE email = 'maria.gonzalez@email.com';
    SELECT id INTO v_visitor_2 FROM visitors WHERE email = 'carlos.ramirez@email.com';
    SELECT id INTO v_visitor_3 FROM visitors WHERE email = 'ana.lopez@email.com';
    SELECT id INTO v_visitor_4 FROM visitors WHERE email = 'pedro.martinez@email.com';
    SELECT id INTO v_visitor_5 FROM visitors WHERE email = 'laura.fernandez@email.com';

    -- =============================================
    -- TESTIMONIALS (15 testimonials)
    -- =============================================

    -- Testimonial 1 - PUBLISHED - LMS Platform - María
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'La mejor plataforma de cursos',
        'Increíble experiencia usando esta plataforma de cursos. Mi rendimiento académico mejoró un 80% desde que empecé a usarla. Los módulos son muy interactivos.',
        'PUBLISHED',
        v_visitor_1,
        v_org_id,
        v_product_lms
    ) RETURNING id INTO v_testimonial_1;

    -- Testimonial 2 - PUBLISHED - Bootcamp Fullstack - Carlos
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Mi transición a developer fue un éxito',
        'Gracias al bootcamp pude conseguir mi primer empleo como desarrollador fullstack en apenas 6 meses. El contenido es muy práctico.',
        'PUBLISHED',
        v_visitor_2,
        v_org_id,
        v_product_bootcamp
    ) RETURNING id INTO v_testimonial_2;

    -- Testimonial 3 - APPROVED - App de Idiomas - Ana
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Aprendí inglés en 3 meses',
        'La aplicación de idiomas es fantástica. Uso la app diariamente y he logrado aprobar el examen de Cambridge.',
        'APPROVED',
        v_visitor_3,
        v_org_id,
        v_product_lang_app
    ) RETURNING id INTO v_testimonial_3;

    -- Testimonial 4 - PENDING - Data Science - Pedro
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Excelente certificación profesional',
        'La certificación en Data Science me abrió muchas puertas laborales. El temario es completo.',
        'PENDING',
        v_visitor_4,
        v_org_id,
        v_product_data_sci
    ) RETURNING id INTO v_testimonial_4;

    -- Testimonial 5 - PUBLISHED - Tutorías - Laura
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Mis hijos mejoraron sus notas',
        'Las tutorías online fueron la mejor decisión. Mis hijos entienden mejor las matemáticas y la física.',
        'PUBLISHED',
        v_visitor_5,
        v_org_id,
        v_product_tutoring
    ) RETURNING id INTO v_testimonial_5;

    -- Testimonial 6 - APPROVED - UX/UI Course - María
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Curso muy completo',
        'El curso de UX/UI me enseñó a crear interfaces increíbles. Ahora trabajo como diseñador UI.',
        'APPROVED',
        v_visitor_1,
        v_org_id,
        v_product_ux_ui
    ) RETURNING id INTO v_testimonial_6;

    -- Testimonial 7 - PUBLISHED - Simulador de Entrevistas - Carlos
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Me ayudó a conseguir mi empleo soñado',
        'El simulador de entrevistas fue clave para mi preparación. Practiqué dozens de veces.',
        'PUBLISHED',
        v_visitor_2,
        v_org_id,
        v_product_interview
    ) RETURNING id INTO v_testimonial_7;

    -- Testimonial 8 - PENDING - Microlearning - Ana
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Perfecto para aprender en movimiento',
        'Me encanta el formato de microlearning. Puedo aprender mientras espero el autobús.',
        'PENDING',
        v_visitor_3,
        v_org_id,
        v_product_microlearn
    ) RETURNING id INTO v_testimonial_8;

    -- Testimonial 9 - REJECTED - Marketing Academy - Pedro
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Buen contenido pero faltaron ejemplos prácticos',
        'El contenido teórico es bueno pero me gustaría ver más casos prácticos de SEO.',
        'REJECTED',
        v_visitor_4,
        v_org_id,
        v_product_mkt_academy
    ) RETURNING id INTO v_testimonial_9;

    -- Testimonial 10 - PUBLISHED - Exam Platform - Laura
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Evaluar a mis estudiantes es más fácil',
        'Como profesora, la plataforma de evaluaciones me ha ahorrado horas de trabajo.',
        'PUBLISHED',
        v_visitor_5,
        v_org_id,
        v_product_exam_plt
    ) RETURNING id INTO v_testimonial_10;

    -- Testimonial 11 - PUBLISHED - Bootcamp - Carlos
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Empecé mi primer empleo gracias al bootcamp',
        'La formación fue impecable. Ahora trabajo en una startup tecnológica innovating.',
        'PUBLISHED',
        v_visitor_2,
        v_org_id,
        v_product_bootcamp
    ) RETURNING id INTO v_testimonial_11;

    -- Testimonial 12 - APPROVED - LMS Platform - Ana
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Excelente para desarrollar habilidades',
        'Los cursos son muy detallados y el soporte es excelente. Recomendado 100%.',
        'APPROVED',
        v_visitor_3,
        v_org_id,
        v_product_lms
    ) RETURNING id INTO v_testimonial_12;

    -- Testimonial 13 - PUBLISHED - Tutorías - Pedro
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Tutores muy profesionales',
        'La atención personalizada me ayudó a aprobar las materias que más me costaban.',
        'PUBLISHED',
        v_visitor_4,
        v_org_id,
        v_product_tutoring
    ) RETURNING id INTO v_testimonial_13;

    -- Testimonial 14 - APPROVED - App Idiomas - Laura
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Aprendizaje divertido y efectivo',
        'La gamificación hace que aprender idiomas sea divertido. Mis hijos también lo usan.',
        'APPROVED',
        v_visitor_5,
        v_org_id,
        v_product_lang_app
    ) RETURNING id INTO v_testimonial_14;

    -- Testimonial 15 - PUBLISHED - Microlearning - María
    INSERT INTO testimonials (title, content, status, visitor_id, organization_id, product_id)
    VALUES (
        'Ideal para profesionales ocupado',
        'Las lecciones cortas se adaptan perfectamente a mi horario laboral.',
        'PUBLISHED',
        v_visitor_1,
        v_org_id,
        v_product_microlearn
    ) RETURNING id INTO v_testimonial_15;

    -- =============================================
    -- MEDIAS (15 media entries)
    -- URLs rotation: 1,2,3,4,5,1,2,3,4,5,1,2,3,4,5
    -- =============================================

    -- Media 1 - Testimonial 1 (PUBLISHED) - María - LMS
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.marketingdirecto.com/wp-content/uploads/2012/08/mujeresss2.jpg', 'media_001', v_testimonial_1, v_org_id);

    -- Media 2 - Testimonial 2 (PUBLISHED) - Carlos - Bootcamp
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/smiling-young-woman-showing-smartphone-260nw-2755033969.jpg', 'media_002', v_testimonial_2, v_org_id);

    -- Media 3 - Testimonial 3 (APPROVED) - Ana - Idiomas
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/excited-young-asian-man-holding-260nw-2730258585.jpg', 'media_003', v_testimonial_3, v_org_id);

    -- Media 4 - Testimonial 4 (PENDING) - Pedro - Data Science
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://next-ideas-4u.s3.us-east-2.amazonaws.com/blog/mi-nuevo-trabajo-que-esperar-de-eso-6.jpg', 'media_004', v_testimonial_4, v_org_id);

    -- Media 5 - Testimonial 5 (PUBLISHED) - Laura - Tutorías
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://revistaemprende.cl/wp-content/uploads/2019/03/Revista-Emprende-3-1.jpg', 'media_005', v_testimonial_5, v_org_id);

    -- Media 6 - Testimonial 6 (APPROVED) - María - UX/UI
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.marketingdirecto.com/wp-content/uploads/2012/08/mujeresss2.jpg', 'media_006', v_testimonial_6, v_org_id);

    -- Media 7 - Testimonial 7 (PUBLISHED) - Carlos - Entrevistas
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/smiling-young-woman-showing-smartphone-260nw-2755033969.jpg', 'media_007', v_testimonial_7, v_org_id);

    -- Media 8 - Testimonial 8 (PENDING) - Ana - Microlearning
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/excited-young-asian-man-holding-260nw-2730258585.jpg', 'media_008', v_testimonial_8, v_org_id);

    -- Media 9 - Testimonial 9 (REJECTED) - Pedro - Marketing
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://next-ideas-4u.s3.us-east-2.amazonaws.com/blog/mi-nuevo-trabajo-que-esperar-de-eso-6.jpg', 'media_009', v_testimonial_9, v_org_id);

    -- Media 10 - Testimonial 10 (PUBLISHED) - Laura - Exams
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://revistaemprende.cl/wp-content/uploads/2019/03/Revista-Emprende-3-1.jpg', 'media_010', v_testimonial_10, v_org_id);

    -- Media 11 - Testimonial 11 (PUBLISHED) - Carlos - Bootcamp
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.marketingdirecto.com/wp-content/uploads/2012/08/mujeresss2.jpg', 'media_011', v_testimonial_11, v_org_id);

    -- Media 12 - Testimonial 12 (APPROVED) - Ana - LMS
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/smiling-young-woman-showing-smartphone-260nw-2755033969.jpg', 'media_012', v_testimonial_12, v_org_id);

    -- Media 13 - Testimonial 13 (PUBLISHED) - Pedro - Tutorías
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://www.shutterstock.com/image-photo/excited-young-asian-man-holding-260nw-2730258585.jpg', 'media_013', v_testimonial_13, v_org_id);

    -- Media 14 - Testimonial 14 (APPROVED) - Laura - Idiomas
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://next-ideas-4u.s3.us-east-2.amazonaws.com/blog/mi-nuevo-trabajo-que-esperar-de-eso-6.jpg', 'media_014', v_testimonial_14, v_org_id);

    -- Media 15 - Testimonial 15 (PUBLISHED) - María - Microlearning
    INSERT INTO medias (type, provider, url, public_id, testimonial_id, organization_id)
    VALUES ('IMAGE', 'CLOUDINARY', 'https://revistaemprende.cl/wp-content/uploads/2019/03/Revista-Emprende-3-1.jpg', 'media_015', v_testimonial_15, v_org_id);

    RAISE NOTICE 'V5 migration completed: 5 visitors, 15 testimonials, 15 medias inserted successfully';

END $$;
