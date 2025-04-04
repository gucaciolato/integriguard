/**
 * IntegriGuard - Configuração dos artigos disponíveis
 */

export const articles = {
    security: {
        title: "Segurança em Aplicações Web Modernas",
        description: "Técnicas e melhores práticas para proteger suas aplicações web contra ameaças comuns.",
        main_topics: [
            "Principais ameaças de segurança em 2023",
            "Injeção de SQL e Cross-Site Scripting (XSS)",
            "Implementação de HTTPS",
            "Validação de entrada e gerenciamento de dependências"
        ]
    },
    dataProtection: {
        title: "Como Proteger Dados Sensíveis de Usuários",
        description: "Estratégias para armazenar e gerenciar dados de usuários de forma segura, em conformidade com leis de proteção de dados.",
        main_topics: [
            "Importância da proteção de dados",
            "Criptografia e técnicas de hash",
            "Conformidade com LGPD, GDPR e outras regulamentações",
            "Minimização de dados e controle de acesso"
        ]
    },
    twoFactor: {
        title: "Autenticação de Dois Fatores: Por Que Implementar",
        description: "Entenda como a autenticação de dois fatores pode aumentar significativamente a segurança das suas aplicações.",
        main_topics: [
            "Limitações da autenticação apenas com senha",
            "Benefícios da implementação de 2FA",
            "Tipos de autenticação de dois fatores",
            "Estratégias de implementação e experiência do usuário"
        ]
    },
    sqlInjection: {
        title: "Prevenindo Ataques de SQL Injection",
        description: "Técnicas para prevenir um dos vetores de ataque mais comuns em aplicações web.",
        main_topics: [
            "Como funcionam ataques de SQL Injection",
            "Consultas parametrizadas e ORMs",
            "Validação de entrada e escape correto",
            "Configuração de banco de dados com privilégios mínimos"
        ]
    },
    apiSecurity: {
        title: "Segurança em APIs: Boas Práticas",
        description: "Como desenvolver e expor APIs seguras em sua aplicação.",
        main_topics: [
            "Autenticação e autorização robustas",
            "Implementação correta de HTTPS e tokens JWT",
            "Validação rigorosa de entrada e prevenção de CORS malconfigurado",
            "Proteção contra ataques comuns em APIs REST e GraphQL"
        ]
    }
}; 