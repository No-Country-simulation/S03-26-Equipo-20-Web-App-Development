package org.precioustestimonials.cms.config;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "org.precioustestimonials.cms.domain.usuarios.repository",
        entityManagerFactoryRef = "usuariosEntityManagerFactory",
        transactionManagerRef = "usuariosTransactionManager"
)
public class UsuariosDbConfig {

    @Bean(name = "usuariosEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean usuariosEntityManagerFactory(
            EntityManagerFactoryBuilder builder, @Qualifier("usuariosDataSource") DataSource dataSource) {

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "none");
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");

        return builder
                .dataSource(dataSource)
                .packages("org.precioustestimonials.cms.domain.usuarios.entity")
                .persistenceUnit("usuarios")
                .properties(properties)
                .build();
    }

    @Bean(name = "usuariosTransactionManager")
    public PlatformTransactionManager usuariosTransactionManager(
            @Qualifier("usuariosEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
