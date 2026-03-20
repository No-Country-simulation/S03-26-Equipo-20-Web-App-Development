package org.precioustestimonials.cms.config;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class FlywayMigrationConfig {

    // 1. Migración para AUTH
    @Bean(initMethod = "migrate")
    public Flyway flywayAuth(@Qualifier("authDataSource") DataSource dataSource) {
        return Flyway.configure()
                .dataSource(dataSource)
                .locations("db/migration/auth") // Carpeta específica
                .baselineOnMigrate(true)
                .load();
    }

    // 2. Migración para USUARIOS
    @Bean(initMethod = "migrate")
    public Flyway flywayUsuarios(@Qualifier("usuariosDataSource") DataSource dataSource) {
        return Flyway.configure()
                .dataSource(dataSource)
                .locations("db/migration/usuarios")
                .baselineOnMigrate(true)
                .load();
    }

    // 3. Migración para CMS (Primary)
    @Bean(initMethod = "migrate")
    public Flyway flywayCms(@Qualifier("cmsDataSource") DataSource dataSource) {
        return Flyway.configure()
                .dataSource(dataSource)
                .locations("db/migration/cms")
                .baselineOnMigrate(true)
                .load();
    }
}
