package com.ufc.apiPenduraAi.configuratios;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customerOpenAPI(){
        Contact contact = new Contact();
        contact.setName("Jorge Roniel");
        contact.setEmail("jorgeroniel.dev@gmail.com");

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                )
                .addSecurityItem(new SecurityRequirement()
                        .addList("bearerAuth")
                )
                .info(new Info()
                        .version("1.0")
                        .title("Rotas - Pendura Aí")
                        .description("Documentação das Rotas da API do serviço Pendura Aí")
                        .contact(contact));
    }
}
