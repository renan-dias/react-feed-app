// Arquivo reportWebVitals.js
// Este arquivo é gerado pelo Create React App e é usado para medir métricas de performance
// importantes da aplicação, conhecidas como Web Vitals.
// Web Vitals são um conjunto de métricas do Google focadas na experiência do usuário,
// cobrindo aspectos como velocidade de carregamento, interatividade e estabilidade visual.

// A função `reportWebVitals` recebe um callback (`onPerfEntry`) que será chamado
// quando uma métrica de Web Vitals for registrada.
const reportWebVitals = onPerfEntry => {
  // Verifica se `onPerfEntry` foi fornecido e se é uma função.
  // Isso permite que o chamador decida se quer ou não registrar os Web Vitals.
  // Por exemplo, em `src/index.js`, pode-se chamar `reportWebVitals(console.log)`
  // para logar as métricas no console, ou enviar para um serviço de analytics.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importa dinamicamente a biblioteca `web-vitals`.
    // O import dinâmico (`import()`) faz com que o código da biblioteca `web-vitals`
    // seja carregado apenas quando `reportWebVitals` é chamado com um callback válido.
    // Isso pode ajudar a reduzir o tamanho do bundle inicial da aplicação se os Web Vitals
    // não forem usados imediatamente ou em todos os ambientes.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Uma vez que a biblioteca `web-vitals` é carregada, suas funções são chamadas
      // para registrar cada uma das métricas principais:
      
      // CLS (Cumulative Layout Shift): Mede a estabilidade visual.
      // Quantifica o quanto o conteúdo da página se move inesperadamente.
      getCLS(onPerfEntry);
      
      // FID (First Input Delay): Mede a interatividade.
      // Quantifica o tempo desde a primeira interação do usuário (ex: clique)
      // até o momento em que o navegador consegue processar essa interação.
      getFID(onPerfEntry);
      
      // FCP (First Contentful Paint): Mede a velocidade de carregamento percebida.
      // Marca o tempo até que o primeiro conteúdo (texto, imagem, etc.) seja renderizado na tela.
      getFCP(onPerfEntry);
      
      // LCP (Largest Contentful Paint): Mede a velocidade de carregamento percebida do conteúdo principal.
      // Marca o tempo até que o maior elemento de conteúdo (imagem ou bloco de texto) seja renderizado.
      getLCP(onPerfEntry);
      
      // TTFB (Time to First Byte): Mede o tempo de resposta do servidor.
      // Marca o tempo desde o início da navegação até o primeiro byte da resposta do servidor ser recebido.
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
