package org.precioustestimonials.cms.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;

/*
 * MÉTODO DE YARETZI:
 *
 * Al usar su método (el de los dos pasos):
 * DataSourceProperties: Primero creas un objeto que solo "lee" los datos.
 * .initializeDataSourceBuilder().type(HikariDataSource.class).build(): Después construyes el DataSource
 * asegurándote de que sea tipo Hikari.
 *
 * Esto garantiza que si en el futuro quieres tunear la base de datos (por ejemplo, subir a 50 conexiones
 * porque tu app es un éxito), Spring lea esas propiedades de Hikari sin problemas.
 *
 */


@Configuration
public class DataSourceConfig {

    // 1. CONFIGURACIÓN PARA AUTH (Seguridad)
    @Bean
    @ConfigurationProperties("spring.datasource.auth")
    public DataSourceProperties authDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource authDataSource() {
        return authDataSourceProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }

    // 2. CONFIGURACIÓN PARA USUARIOS
    @Bean
    @ConfigurationProperties("spring.datasource.usuarios")
    public DataSourceProperties usuariosDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource usuariosDataSource() {
        return usuariosDataSourceProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }

    // 3. CONFIGURACIÓN PARA CMS CORE (Principal)
    @Bean
    @ConfigurationProperties("spring.datasource.cms")
    public DataSourceProperties cmsDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Primary // Marcamos esta como la principal para Spring
    @Bean
    public DataSource cmsDataSource() {
        return cmsDataSourceProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }


}
