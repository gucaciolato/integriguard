/**
 * IntegriGuard Blog - Script Principal
 * Responsável por carregar e renderizar artigos em Markdown
 */

// Carrega a biblioteca marked.js para converter Markdown para HTML
document.addEventListener('DOMContentLoaded', () => {
  // Carrega a biblioteca Marked.js via CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  script.onload = inicializarBlog;
  document.head.appendChild(script);
  
  // Configura lazy loading para imagens
  if ('loading' in HTMLImageElement.prototype) {
    // Se o browser suporta lazy loading nativo
    document.querySelectorAll('img').forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Poderíamos implementar um fallback para lazy loading aqui
    console.log("Este navegador não suporta lazy loading nativo para imagens.");
  }
});

// Lista de artigos (simulando um CMS)
// Em produção, isso poderia vir de uma API ou banco de dados
const ARTIGOS = [
  {
    id: 1,
    titulo: 'Arquitetura Orientada a Eventos: Como Turbinar suas Integrações na Velocidade da Luz!',
    resumo: 'Descubra como a arquitetura orientada a eventos pode transformar suas integrações em sistemas rápidos, escaláveis e desacoplados.',
    data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    arquivo: 'arquitetura-eventos.md',
    imagem: 'img/Rodovia de Dados na Cidade.png',
    autor: 'Gu Caciolato',
    tags: ['eventos', 'arquitetura', 'integração', 'sistemas', 'Kafka', 'PubSub', 'streaming', 'microserviços', 'real-time']
  },
  {
    id: 2,
    titulo: 'Integração vs Automação de Sistemas: Qual é a Diferença, Afinal?',
    resumo: 'Entenda as diferenças entre integração e automação de sistemas, quando usar cada um e as melhores ferramentas do mercado.',
    data: '2025-03-01',
    arquivo: 'integracao-vs-automacao-sistemas.md',
    imagem: 'img/Galáxias da Integração e Automação.png',
    autor: 'Gu Caciolato',
    tags: ['integração', 'automação', 'sistemas', 'RPA', 'API', 'workflow', 'transformação digital']
  }
];

// Variável para armazenar a tag atual de filtro
let tagAtual = '';

// Inicializa o blog depois que a biblioteca Marked for carregada
function inicializarBlog() {
  // Configura o Marked para melhor segurança
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      sanitize: true, // Deprecated mas ainda útil em versões antigas
      headerIds: true,
      breaks: true,
      gfm: true
    });
  }
  
  // Inicializa as diferentes seções conforme necessário
  carregarListaArtigos();
  
  // Verifica se estamos na página de um artigo específico
  const params = new URLSearchParams(window.location.search);
  const artigoId = params.get('id');
  
  if (artigoId) {
    carregarArtigo(artigoId);
  }
  
  // Adiciona event listeners para busca e outros elementos interativos
  configurarEventListeners();
  
  // Garantir que o conteúdo da seção sobre não seja alterado
  const sobreConteudo = document.getElementById('sobre-conteudo');
  if (sobreConteudo) {
    // Guardar o HTML original
    const conteudoOriginal = sobreConteudo.innerHTML;
    
    // Verificar periodicamente se o conteúdo foi alterado e restaurar se necessário
    setInterval(() => {
      if (sobreConteudo.innerHTML !== conteudoOriginal) {
        console.log('Conteúdo da seção sobre foi alterado. Restaurando...');
        sobreConteudo.innerHTML = conteudoOriginal;
      }
    }, 500); // Verificar a cada 500ms
  }
}

// Configura event listeners para elementos interativos
function configurarEventListeners() {
  // Adiciona listener para campo de busca
  const campoBusca = document.getElementById('campo-busca');
  if (campoBusca) {
    campoBusca.addEventListener('input', (e) => {
      // Se tiver uma tag ativa, desativa o filtro de tag
      if (tagAtual) {
        tagAtual = '';
        removerFiltroTag();
      }
      const termo = e.target.value.toLowerCase();
      filtrarArtigos(termo);
    });
  }
}

// Função para filtrar artigos baseado em um termo de busca
function filtrarArtigos(termo) {
  const container = document.getElementById('lista-artigos');
  if (!container) return;
  
  // Se o termo está vazio, mostra todos os artigos
  if (!termo.trim()) {
    carregarListaArtigos();
    return;
  }
  
  // Filtra artigos pelo título, resumo ou tags
  const artigosFiltrados = ARTIGOS.filter(artigo => 
    artigo.titulo.toLowerCase().includes(termo) || 
    artigo.resumo.toLowerCase().includes(termo) ||
    (artigo.tags && artigo.tags.some(tag => tag.toLowerCase().includes(termo)))
  );
  
  // Limpa o conteúdo atual
  container.innerHTML = '';
  
  // Se não encontrou resultados
  if (artigosFiltrados.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4">
        <p>Nenhum artigo encontrado para o termo "${termo}".</p>
      </div>
    `;
    return;
  }
  
  // Adiciona os artigos filtrados
  artigosFiltrados.forEach(artigo => {
    adicionarArtigoLista(artigo, container);
  });
}

// Função para filtrar artigos por tag
function filtrarArtigosPorTag(tag) {
  tagAtual = tag;
  const container = document.getElementById('lista-artigos');
  if (!container) return;
  
  // Adiciona elemento de filtro ativo
  adicionarFiltroTagAtiva(tag);
  
  // Filtra artigos pela tag
  const artigosFiltrados = ARTIGOS.filter(artigo => 
    artigo.tags && artigo.tags.includes(tag)
  );
  
  // Limpa o conteúdo atual
  container.innerHTML = '';
  
  // Adiciona os artigos filtrados
  artigosFiltrados.forEach(artigo => {
    adicionarArtigoLista(artigo, container);
  });
}

// Adiciona o indicador de filtro por tag ativo
function adicionarFiltroTagAtiva(tag) {
  const container = document.getElementById('lista-artigos');
  if (!container) return;
  
  // Remove filtro existente se houver
  const filtroExistente = document.querySelector('.tag-filter-active');
  if (filtroExistente) {
    filtroExistente.remove();
  }
  
  // Cria o elemento de filtro ativo
  const filtroTag = document.createElement('div');
  filtroTag.className = 'tag-filter-active';
  
  const filtroTitulo = document.createElement('h3');
  filtroTitulo.textContent = `Filtrando por: ${tag}`;
  
  const limparFiltro = document.createElement('span');
  limparFiltro.className = 'clear-filter';
  limparFiltro.textContent = 'Limpar filtro';
  limparFiltro.addEventListener('click', removerFiltroTag);
  
  filtroTitulo.appendChild(limparFiltro);
  filtroTag.appendChild(filtroTitulo);
  
  // Insere no início da lista de artigos
  container.parentNode.insertBefore(filtroTag, container);
}

// Remove o filtro de tag atual
function removerFiltroTag() {
  tagAtual = '';
  
  // Remove o indicador de filtro ativo
  const filtroExistente = document.querySelector('.tag-filter-active');
  if (filtroExistente) {
    filtroExistente.remove();
  }
  
  // Recarrega todos os artigos
  carregarListaArtigos();
  
  // Limpa o campo de busca
  const campoBusca = document.getElementById('campo-busca');
  if (campoBusca) {
    campoBusca.value = '';
  }
}

// Formata a data para exibição
function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Carrega a lista completa de artigos
function carregarListaArtigos() {
  const container = document.getElementById('lista-artigos');
  if (!container) return;
  
  // Limpa o conteúdo atual
  container.innerHTML = '';
  
  // Adiciona cada artigo à lista
  ARTIGOS.forEach(artigo => {
    adicionarArtigoLista(artigo, container);
  });
}

// Adiciona um artigo à lista
function adicionarArtigoLista(artigo, container) {
  // Nome do autor padrão
  const autor = artigo.autor || "Equipe IntegriGuard";
  
  // Criar o elemento de artigo
  const itemArtigo = document.createElement('div');
  itemArtigo.className = 'article-list-item';
  
  // Imagem do artigo
  const img = document.createElement('img');
  img.src = artigo.imagem;
  img.className = 'article-list-image';
  img.alt = artigo.titulo;
  img.loading = 'lazy';
  
  // Conteúdo do artigo
  const conteudo = document.createElement('div');
  conteudo.className = 'article-list-content';
  
  // Título
  const titulo = document.createElement('h3');
  titulo.className = 'article-list-title';
  
  const linkTitulo = document.createElement('a');
  linkTitulo.href = `artigo.html?id=${artigo.id}`;
  linkTitulo.textContent = artigo.titulo;
  linkTitulo.setAttribute('aria-label', `Ler o artigo: ${artigo.titulo}`);
  
  titulo.appendChild(linkTitulo);
  conteudo.appendChild(titulo);
  
  // Metadados (autor e data)
  const meta = document.createElement('div');
  meta.className = 'article-list-meta';
  
  const autorElement = document.createElement('span');
  autorElement.className = 'article-list-author';
  autorElement.innerHTML = `<i class="fas fa-user-edit me-1"></i>${autor}`;
  
  const dataElement = document.createElement('span');
  dataElement.className = 'article-list-date';
  dataElement.innerHTML = `<i class="far fa-calendar-alt me-1"></i>${formatarData(artigo.data)}`;
  
  meta.appendChild(autorElement);
  meta.appendChild(dataElement);
  conteudo.appendChild(meta);
  
  // Descrição/resumo
  const descricao = document.createElement('p');
  descricao.className = 'article-list-description';
  descricao.textContent = artigo.resumo;
  conteudo.appendChild(descricao);
  
  // Tags
  if (artigo.tags && artigo.tags.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'article-list-tags';
    
    artigo.tags.forEach(tag => {
      const tagElement = document.createElement('a');
      tagElement.className = 'article-list-tag';
      tagElement.textContent = tag;
      
      // Adiciona classe ativa se for a tag atual
      if (tag === tagAtual) {
        tagElement.classList.add('active');
      }
      
      // Adiciona evento de clique para filtrar artigos por tag
      tagElement.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarArtigosPorTag(tag);
      });
      
      tagsContainer.appendChild(tagElement);
    });
    
    conteudo.appendChild(tagsContainer);
  }
  
  // Montar o item completo
  itemArtigo.appendChild(img);
  itemArtigo.appendChild(conteudo);
  
  // Adicionar ao container
  container.appendChild(itemArtigo);
}

// Carrega um artigo específico pelo ID
async function carregarArtigo(id) {
  const container = document.getElementById('conteudo-artigo');
  if (!container) return;
  
  // Encontra o artigo pelo ID
  const artigo = ARTIGOS.find(a => a.id == id);
  
  if (!artigo) {
    container.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Artigo não encontrado. <a href="index.html" class="alert-link">Voltar para a página inicial</a>.
      </div>
    `;
    return;
  }
  
  // Atualiza o título da página e meta tags
  document.title = `${artigo.titulo} | ${siteContent.site.name}`;
  
  // Atualiza meta description se existir
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', artigo.resumo);
  }
  
  // Adiciona o cabeçalho do artigo
  const headerHtml = `
    <div class="article-header">
      <h1>${artigo.titulo}</h1>
      <div class="article-date mb-2">
        <i class="far fa-calendar-alt me-1"></i>${formatarData(artigo.data)}
        <span class="ms-3"><i class="fas fa-user-edit me-1"></i>${artigo.autor || 'Equipe IntegriGuard'}</span>
      </div>
      <div class="d-flex flex-wrap gap-1 mb-3">
        ${artigo.tags ? artigo.tags.map(tag => `<a href="index.html#blog" class="article-list-tag" data-tag="${tag}">${tag}</a>`).join(' ') : ''}
      </div>
      <div class="article-image-container mb-4">
        <img src="${artigo.imagem}" alt="${artigo.titulo}" class="img-fluid rounded article-image" loading="lazy">
        <p class="text-muted mt-2 small">Foto: Flux images</p>
      </div>
    </div>
  `;
  container.innerHTML = headerHtml;
  
  // Adiciona event listeners para as tags no artigo
  setTimeout(() => {
    document.querySelectorAll('.article-header .article-list-tag').forEach(tagElement => {
      tagElement.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = tagElement.getAttribute('data-tag');
        // Armazena a tag selecionada no localStorage para ser usada na página inicial
        localStorage.setItem('selectedTag', tag);
      });
    });
  }, 100);
  
  try {
    // Carrega o conteúdo do arquivo Markdown
    const response = await fetch(`posts/${artigo.arquivo}`);
    
    if (!response.ok) {
      throw new Error(`Falha ao carregar o arquivo: ${response.status}`);
    }
    
    const markdown = await response.text();
    
    // Converte Markdown para HTML e adiciona ao container
    const contentHtml = `
      <div class="article-content">
        ${marked.parse(markdown)}
      </div>
    `;
    container.innerHTML += contentHtml;
    
    // Carrega artigos relacionados
    carregarArtigosRelacionados(artigo);
    
    // Adiciona lazy loading para todas as imagens no conteúdo
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('.article-content img').forEach(img => {
        img.loading = 'lazy';
        // Adiciona classe para estilo responsivo
        img.classList.add('img-fluid');
      });
    }
  } catch (error) {
    console.error('Erro ao carregar o artigo:', error);
    container.innerHTML += `
      <div class="alert alert-danger" role="alert">
        Erro ao carregar o conteúdo do artigo. Por favor, tente novamente mais tarde.
      </div>
    `;
  }
}

// Carrega artigos relacionados baseados nas tags
function carregarArtigosRelacionados(artigoAtual) {
  const container = document.getElementById('posts-relacionados');
  if (!container || !artigoAtual.tags) return;
  
  // Encontra artigos que compartilham tags com o artigo atual
  const relacionados = ARTIGOS.filter(artigo => 
    artigo.id !== artigoAtual.id && 
    artigo.tags && 
    artigo.tags.some(tag => artigoAtual.tags.includes(tag))
  );
  
  // Se não houver artigos relacionados
  if (relacionados.length === 0) {
    container.innerHTML = `<p class="text-center">${siteContent.articlePage.relatedArticles.noRelatedText}</p>`;
    return;
  }
  
  // Adiciona cada artigo relacionado no formato de lista
  container.innerHTML = '<div class="article-list related-articles"></div>';
  const listaContainer = container.querySelector('.article-list');
  
  relacionados.forEach(artigo => {
    adicionarArtigoLista(artigo, listaContainer);
  });
}

// Verifica se há uma tag selecionada no localStorage quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
  // Executa apenas na página inicial
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    const selectedTag = localStorage.getItem('selectedTag');
    if (selectedTag) {
      // Limpa o localStorage para não persistir a seleção
      localStorage.removeItem('selectedTag');
      
      // Aguarda um pouco para que o blog já tenha sido inicializado
      setTimeout(() => {
        filtrarArtigosPorTag(selectedTag);
      }, 500);
    }
  }
}); 
