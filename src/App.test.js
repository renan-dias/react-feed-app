import { render, screen } from '@testing-library/react';
import App from './App';

// Este é um arquivo de teste de exemplo gerado pelo Create React App.
// Ele demonstra um teste básico para verificar se o componente App renderiza um link
// que contém o texto "learn react".

// A função `test` define um caso de teste individual.
// O primeiro argumento é uma string que descreve o teste.
// O segundo argumento é uma função que contém a lógica do teste.
test('renders learn react link', () => {
  // A função `render` da @testing-library/react renderiza o componente App em um DOM virtual.
  // Isso permite testar o componente sem precisar de um navegador real.
  render(<App />);
  
  // `screen.getByText` é uma query da @testing-library/react que busca por um elemento
  // que contenha o texto especificado (neste caso, uma expressão regular /learn react/i,
  // que ignora maiúsculas/minúsculas).
  // Se o elemento não for encontrado, a query lança um erro, falhando o teste.
  const linkElement = screen.getByText(/learn react/i);
  
  // `expect` é uma função do Jest (o framework de teste) que, combinada com "matchers"
  // como `toBeInTheDocument`, permite verificar se certas condições são verdadeiras.
  // `toBeInTheDocument` verifica se o `linkElement` está presente no DOM virtual.
  expect(linkElement).toBeInTheDocument();
});
