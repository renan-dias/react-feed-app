import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa a nova API de root do React 18.
import './index.css'; // Estilos globais para a aplicação.
import App from './App'; // Componente raiz da aplicação.
import reportWebVitals from './reportWebVitals'; // Função para medir performance (web vitals).
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa os estilos CSS do Bootstrap.
                                            // Isso garante que os componentes do React Bootstrap
                                            // e classes de utilitários do Bootstrap funcionem corretamente.

// Cria o root da aplicação React.
// `document.getElementById('root')` obtém o elemento DOM onde a aplicação React será montada.
// Este elemento 'root' geralmente é uma `div` vazia no arquivo `public/index.html`.
// `ReactDOM.createRoot` é a nova API do React 18 para iniciar a renderização da aplicação.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal (`App`) dentro do root.
// `<React.StrictMode>` é um wrapper que ativa verificações e avisos adicionais em modo de desenvolvimento.
// Ajuda a identificar potenciais problemas, como uso de APIs depreciadas ou efeitos colaterais inesperados.
// Ele não afeta a build de produção.
root.render(
  <React.StrictMode>
    {/* O componente App é o ponto de entrada da interface da aplicação.
        Ele geralmente contém a configuração de rotas, provedores de contexto, etc. */}
    <App />
  </React.StrictMode>
);

// Função para medir Web Vitals (métricas de performance e experiência do usuário).
// `reportWebVitals` pode receber uma função para logar os resultados (ex: `console.log`)
// ou enviá-los para um endpoint de analytics.
// É útil para monitorar a performance da aplicação em produção.
// Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
