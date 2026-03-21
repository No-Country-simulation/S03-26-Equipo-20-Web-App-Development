-- 1. Crear la base de datos de Usuarios (si no existe)
SELECT 'CREATE DATABASE db_usuarios'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_usuarios')\gexec
ALTER DATABASE db_usuarios SET bytea_output = 'hex';
-- Forzamos el encoding en la creación (Postgres por defecto usa el del template, pero aquí aseguramos)
COMMENT ON DATABASE db_usuarios IS 'Base de datos para perfiles y datos personales con UTF8';

-- 2. Crear la base de datos de CMS Core
SELECT 'CREATE DATABASE db_cms'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_cms')\gexec
COMMENT ON DATABASE db_cms IS 'Base de datos para testimonios, productos y campañas';

-- 3. Configurar privilegios
-- Nota: 'db_auth' ya fue creada por el environment del docker-compose.yml
-- pero nos aseguramos de que el usuario tenga todos los permisos en las 3.

GRANT ALL PRIVILEGES ON DATABASE db_auth TO cms_admin;
GRANT ALL PRIVILEGES ON DATABASE db_usuarios TO cms_admin;
GRANT ALL PRIVILEGES ON DATABASE db_cms TO cms_admin;

-- 4. Ajustes de Collation preventivos (opcional pero recomendado)
-- Esto asegura que las búsquedas no fallen por acentos si el cliente se conecta raro
ALTER SYSTEM SET client_encoding TO 'UTF8';