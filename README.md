# IntegriGuard Blog

Um blog sobre segurança digital e integração de sistemas, desenvolvido com JavaScript vanilla, HTML5 e CSS3, utilizando Bootstrap para o layout responsivo.

## Sobre o Projeto

IntegriGuard é um blog focado em conteúdo sobre segurança da informação e boas práticas de desenvolvimento, criado com tecnologias web fundamentais para garantir simplicidade, performance e facilidade de manutenção. O blog utiliza arquivos Markdown para os artigos, permitindo criar e atualizar conteúdo de forma simples.

### Características

- Design responsivo com Bootstrap 5
- Fonte Ubuntu para melhor legibilidade
- Carregamento dinâmico de artigos em Markdown
- Arquitetura modular com sistema de configuração separado
- Esquema de cores personalizado com tema claro
- Zero dependência de frameworks JavaScript

## Estrutura do Projeto

```
integriguard-front/
├── css/
│   └── styles.css           # Estilos personalizados
├── js/
│   ├── config/              # Arquivos de configuração modular
│   │   ├── site.js          # Configurações gerais do site
│   │   ├── navigation.js    # Menu de navegação
│   │   ├── contact.js       # Informações de contato
│   │   ├── about.js         # Seção "Sobre"
│   │   ├── homePage.js      # Configurações da página inicial
│   │   ├── articlePage.js   # Configurações da página de artigo
│   │   ├── footer.js        # Configurações do rodapé
│   │   └── articles.js      # Informações dos artigos
│   ├── content.js           # Combina todos os módulos de configuração
│   ├── content-loader.js    # Carregador que disponibiliza o conteúdo globalmente
│   └── main.js              # Script principal de funcionalidades
├── img/                     # Imagens do blog
├── posts/                   # Arquivos Markdown dos artigos
│   ├── seguranca-web-moderna.md
│   ├── protecao-dados-usuarios.md
│   ├── autenticacao-dois-fatores.md
│   ├── sql-injection.md
│   └── seguranca-apis.md
├── index.html               # Página inicial
├── artigo.html              # Template para exibição de artigos
└── README.md                # Este arquivo
```

## Sistema de Configuração Modular

O IntegriGuard utiliza um sistema modular de configuração que facilita a manutenção do conteúdo:

1. Os arquivos na pasta `js/config/` contêm configurações específicas para cada aspecto do site
2. O arquivo `content.js` importa e combina todos os módulos
3. O `content-loader.js` disponibiliza o conteúdo para scripts não-ES6

Esta arquitetura permite:

- Editar conteúdo sem mexer no HTML
- Modificar cada seção independentemente
- Melhor organização do código

## Como Executar

Por ser um site estático, você pode executá-lo localmente de várias formas:

### Usando Python (Método Simples)

```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

Após executar um dos comandos acima, acesse `http://localhost:8000` no seu navegador.

### Usando Node.js

Se você tem Node.js instalado, pode usar o pacote `http-server`:

```bash
# Instalar globalmente (apenas uma vez)
npm install -g http-server

# Executar o servidor
http-server
```

## Adicionando Novos Artigos

Para adicionar um novo artigo:

1. Crie um arquivo Markdown na pasta `posts/`
2. Adicione as informações do artigo no array `ARTIGOS` no arquivo `js/main.js`
3. Opcionalmente, adicione informações no `js/config/articles.js` para referência
4. Adicione uma imagem relacionada na pasta `img/`

## Personalização

O design do blog pode ser facilmente personalizado:

- Modifique as variáveis CSS em `css/styles.css` para alterar cores, espaçamentos e tamanhos
- Altere o conteúdo editando os arquivos na pasta `js/config/`
- Adapte o layout dos componentes Bootstrap conforme sua preferência

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+ com módulos)
- Bootstrap 5
- Marked.js (para renderização de Markdown)
- Font Awesome (para ícones)
- Fonte Ubuntu (Google Fonts)

## Conteúdo

O blog atualmente conta com artigos sobre:

- Segurança em aplicações web modernas
- Proteção de dados sensíveis
- Autenticação de dois fatores (2FA)
- Prevenção de ataques SQL Injection
- Segurança em APIs

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
