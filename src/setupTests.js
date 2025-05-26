// Arquivo setupTests.js
// Este arquivo é importado automaticamente pelo Jest antes de executar os testes.
// É o local ideal para configurar o ambiente de teste globalmente.

// A importação de '@testing-library/jest-dom' adiciona "matchers" (comparadores) customizados do Jest
// que são específicos para interagir e fazer asserções sobre nós do DOM.
// "Matchers" são funções como `toBeInTheDocument()`, `toHaveTextContent()`, `toHaveAttribute()`, etc.,
// que tornam os testes mais legíveis e expressivos ao verificar o estado da UI.

// Por exemplo, em vez de escrever algo como:
//   expect(document.querySelector('.meu-elemento')).not.toBeNull();
// Você pode escrever de forma mais clara e direta:
//   expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

// E para verificar o conteúdo de texto:
//   expect(screen.getByText('Olá Mundo')).toHaveTextContent(/olá/i);

// Este import enriquece o `expect` do Jest com esses matchers úteis,
// facilitando a escrita de testes que interagem com o DOM de forma mais semântica.
// Para mais informações e uma lista completa de matchers disponíveis,
// consulte a documentação oficial: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Outras configurações globais de teste poderiam ser adicionadas aqui, como:
// - Mock de APIs globais (ex: `fetch`, `localStorage`)
// - Configuração de adaptadores para bibliotecas de UI (ex: Enzyme para React mais antigo)
// - Definição de variáveis de ambiente específicas para testes
// - Configuração de `msw` (Mock Service Worker) para interceptar e mockar chamadas de rede.
