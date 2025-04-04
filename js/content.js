/**
 * IntegriGuard - Arquivo de configuração de conteúdo
 * Este arquivo combina todos os módulos de configuração
 */

// Importar todas as configurações
import { site } from './config/site.js';
import { navigation } from './config/navigation.js';
import { contact } from './config/contact.js';
import { about } from './config/about.js';
import { homePage } from './config/homePage.js';
import { articlePage } from './config/articlePage.js';
import { footer } from './config/footer.js';
import { articles } from './config/articles.js';

// Combinar todas as configurações em um único objeto
const siteContent = {
    site,
    navigation,
    contact,
    about,
    homePage,
    articlePage,
    footer,
    articles
};

/**
 * Função para aplicar o conteúdo aos elementos HTML
 * Esta função é chamada quando o DOM estiver pronto
 */
function applySiteContent() {
    // Configurar títulos e meta tags
    document.title = siteContent.site.name + " - " + siteContent.site.description;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', siteContent.site.metaDescription);
    }
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', siteContent.site.themeColor);
    }

    // Configurar favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.setAttribute('href', siteContent.site.favicon);
    }
    
    // Aplicar nome do site e descrição
    const siteNameElements = document.querySelectorAll('.site-name');
    siteNameElements.forEach(el => {
        el.innerHTML = siteContent.site.nameHTML;
    });
    
    const siteDescriptionElement = document.querySelector('.site-description');
    if (siteDescriptionElement) {
        siteDescriptionElement.textContent = siteContent.site.description;
    }
    
    // Configurar navegação
    const navContainer = document.getElementById('navbarNav');
    if (navContainer) {
        const navList = navContainer.querySelector('ul');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (navList) {
            navList.innerHTML = '';
            siteContent.navigation.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                const a = document.createElement('a');
                a.className = 'nav-link';
                a.href = item.url;
                a.textContent = item.name;
                
                // Marcar o item ativo
                if ((currentPage === 'index.html' && item.id === 'inicio') || 
                    (currentPage !== 'index.html' && item.id === 'blog')) {
                    a.classList.add('active');
                    a.setAttribute('aria-current', 'page');
                }
                
                li.appendChild(a);
                navList.appendChild(li);
            });
        }
    }
    
    // Configurar rodapé
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = `© <span id="ano-atual"></span> ${siteContent.site.nameHTML}. ${siteContent.footer.copyright}`;
    }
    
    // Configurar ícones sociais
    const socialIconsContainer = document.querySelector('.social-icons');
    if (socialIconsContainer) {
        socialIconsContainer.innerHTML = '';
        siteContent.contact.social.forEach(social => {
            const a = document.createElement('a');
            a.href = social.url;
            a.setAttribute('target', '_blank');
            a.setAttribute('aria-label', social.label);
            
            const i = document.createElement('i');
            i.className = social.icon;
            
            a.appendChild(i);
            socialIconsContainer.appendChild(a);
        });
    }
    
    // Verificar se a seção Sobre deve ser atualizada
    const sobreSection = document.querySelector('#sobre');
    if (sobreSection && !sobreSection.hasAttribute('data-no-update')) {
        // Configurar seção Sobre apenas se não tiver o atributo data-no-update
        const aboutTitleElement = sobreSection.querySelector('h2');
        if (aboutTitleElement) {
            aboutTitleElement.textContent = siteContent.about.title;
        }
        
        const aboutLeadElement = sobreSection.querySelector('.lead');
        if (aboutLeadElement) {
            aboutLeadElement.textContent = siteContent.about.lead;
        }
        
        // Adicionar parágrafos na seção Sobre
        const aboutContainer = sobreSection.querySelector('.col-lg-8, .col-lg-10');
        if (aboutContainer) {
            // Remover parágrafos existentes exceto o .lead
            const existingParagraphs = aboutContainer.querySelectorAll('p:not(.lead)');
            existingParagraphs.forEach(p => p.remove());
            
            // Adicionar novos parágrafos
            siteContent.about.paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                aboutContainer.appendChild(p);
            });
        }
    }
    
    // Configurar página inicial
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html' || currentPage === '') {
        const featuredTitleElement = document.querySelector('#destaque h2');
        if (featuredTitleElement) {
            featuredTitleElement.textContent = siteContent.homePage.featured.title;
        }
        
        const allArticlesTitleElement = document.querySelector('#blog h2');
        if (allArticlesTitleElement) {
            allArticlesTitleElement.textContent = siteContent.homePage.allArticles.title;
        }
        
        const searchInput = document.getElementById('campo-busca');
        if (searchInput) {
            searchInput.setAttribute('placeholder', siteContent.homePage.allArticles.searchPlaceholder);
        }
    }
    
    // Configurar página de artigo
    if (currentPage === 'artigo.html') {
        const relatedArticlesTitleElement = document.querySelector('#posts-relacionados').previousElementSibling;
        if (relatedArticlesTitleElement) {
            relatedArticlesTitleElement.textContent = siteContent.articlePage.relatedArticles.title;
        }
        
        const backToTopButton = document.getElementById('btn-voltar-topo');
        if (backToTopButton) {
            backToTopButton.textContent = siteContent.articlePage.backToTop;
        }
    }
    
    // Atualizar ano no copyright
    const anoAtualElement = document.getElementById('ano-atual');
    if (anoAtualElement) {
        anoAtualElement.textContent = new Date().getFullYear();
    }
}

// Executar a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', applySiteContent);

// Exportar o objeto para uso em outros scripts
export default siteContent; 