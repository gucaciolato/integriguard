/**
 * IntegriGuard - Carregador de conteúdo
 * Este script importa o conteúdo do site e o disponibiliza globalmente
 */

import siteContent from './content.js';

// Disponibilizar o objeto siteContent globalmente para os scripts que não usam ES modules
window.siteContent = siteContent;

console.log('Conteúdo do site carregado com sucesso!'); 