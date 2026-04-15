package org.testimonials.cms.swagger.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Value("${info.app.name:CMS API}")
    private String appName;

    @Value("${info.app.version:0.0.1}")
    private String appVersion;

    @Value("${info.app.description:API Documentation}")
    private String appDescription;

    @Value("${info.app.server-url:http://localhost:8080}")
    private String devUrl;

    @Value("${auth.cookie.name:jwt}")
    private String cookieName;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .addServersItem(devServer())
                .addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
                .components(new Components()
                        .addSecuritySchemes("cookieAuth", cookieScheme()));
    }

    private SecurityScheme cookieScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.COOKIE)
                .name(cookieName);
    }

    private Server devServer() {
        return new Server()
                .url(devUrl)
                .description("Servidor de Desarrollo");
    }

    private Info apiInfo() {
        return new Info()
                .title(appName)
                .version(appVersion)
                .description("""
                        ## %s
                        
                        API especializada en la recopilación, moderación y publicación de historias de éxito.
                        
                        **Funcionalidades clave:**
                        - Gestión de contenido multimedia (Integración con **YouTube** y **Cloudinary**).
                        - Clasificación por categorías y etiquetas.
                        - Flujo de moderación para publicación.
                        - API pública para consumo desde sitios externos.
                        
                        **Seguridad:**
                        - Autenticación mediante **JWT** almacenado en Cookies HTTP-only.
                        - Roles: ADMIN, EDITOR y VISITANTE.
                        """.formatted(appDescription));
    }
}
