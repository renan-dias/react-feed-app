# Projeto Mini Rede Social com React e Firebase

## Descrição

Este projeto é uma aplicação web de mini rede social desenvolvida com React e Firebase. O seu propósito principal é demonstrar a integração dessas tecnologias para criar uma plataforma interativa onde usuários podem se autenticar, criar postagens, visualizar um feed de atividades e interagir com o conteúdo. É um projeto educativo focado em boas práticas de desenvolvimento frontend e backend como serviço (BaaS).

Principais Recursos:
*   Autenticação de usuários com Google (Firebase Authentication).
*   Criação e exibição de postagens em tempo real (Firestore).
*   Feed de postagens ordenado cronologicamente.
*   Interação com posts (curtidas).
*   Design responsivo utilizando React Bootstrap.
*   Roteamento de páginas com React Router.
*   Modal para criação de posts, melhorando a experiência do usuário.

## Tecnologias Utilizadas

*   **React (v18+)**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **Firebase**: Plataforma do Google para desenvolvimento de aplicações web e mobile.
    *   **Firebase Authentication**: Para gerenciamento de autenticação de usuários.
    *   **Firestore**: Banco de dados NoSQL em tempo real para armazenar dados da aplicação (posts, usuários, etc.).
    *   **Firebase Hosting** (potencial): Para deploy da aplicação.
*   **React Bootstrap**: Biblioteca de componentes UI baseada no Bootstrap, para um design responsivo e moderno.
*   **React Router (v6+)**: Para gerenciamento de rotas na aplicação Single Page Application (SPA).
*   **React Icons**: Para inclusão de ícones vetoriais.
*   **JavaScript (ES6+)**: Linguagem de programação base.
*   **CSS3**: Para estilizações customizadas.
*   **Node.js & npm**: Ambiente de execução JavaScript e gerenciador de pacotes.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [npm](https://www.npmjs.com/) (geralmente vem instalado com o Node.js)
*   [Git](https://git-scm.com/)

Você também precisará de uma conta Firebase e um projeto configurado. As credenciais do Firebase devem ser adicionadas ao arquivo `src/firebase.js`.

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento local:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_AQUI>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    Execute o comando abaixo na raiz do projeto para instalar todas as bibliotecas e pacotes necessários listados no `package.json`.
    ```bash
    npm install
    ```

3.  **Configure o Firebase:**
    *   Crie um projeto no [console do Firebase](https://console.firebase.google.com/).
    *   Adicione um aplicativo da Web ao seu projeto Firebase.
    *   Copie o objeto de configuração do Firebase (SDK setup snippet).
    *   Cole essas credenciais no arquivo `src/firebase.js`, substituindo os placeholders existentes. O arquivo deve se parecer com:
        ```javascript
        // src/firebase.js
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: "SUA_API_KEY",
          authDomain: "SEU_AUTH_DOMAIN",
          projectId: "SEU_PROJECT_ID",
          storageBucket: "SEU_STORAGE_BUCKET",
          messagingSenderId: "SEU_MESSAGING_SENDER_ID",
          appId: "SEU_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        ```

## Executando o Projeto

Após a instalação e configuração, você pode iniciar o servidor de desenvolvimento:

```bash
npm start
```

Este comando executa a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no seu navegador. A página será recarregada automaticamente se você fizer edições no código. Você também verá quaisquer erros de lint no console.

## Estrutura do Projeto

A estrutura de pastas e arquivos principais do projeto é organizada da seguinte forma:

```
/
├── public/             # Arquivos estáticos e HTML base
│   └── index.html      # Ponto de entrada HTML
├── src/                # Código fonte da aplicação
│   ├── assets/         # Imagens, fontes e outros recursos estáticos
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── Auth/       # Componentes de autenticação (Login, ProtectedRoute)
│   │   ├── Feed/       # Componentes relacionados ao feed (Feed, Post, CreatePostBox - obsoleto)
│   │   ├── Home/       # Componente da página inicial
│   │   ├── Layout/     # Componentes de layout (Sidebar, MainContent)
│   │   ├── Modals/     # Componentes de modal (CreatePostModal, GenericModal)
│   │   └── Pages/      # Componentes de páginas completas (NotFoundPage)
│   ├── context/        # Contextos React (ex: AuthContext)
│   ├── App.js          # Componente principal da aplicação e configuração de rotas
│   ├── App.css         # Estilos globais para App.js
│   ├── firebase.js     # Configuração e inicialização do Firebase SDK
│   ├── index.js        # Ponto de entrada JavaScript, renderiza o App
│   └── index.css       # Estilos globais
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── package.json        # Metadados do projeto e lista de dependências
└── README.md           # Este arquivo
```

*   **`src/components`**: Contém subpastas para diferentes categorias de componentes, promovendo a modularidade.
*   **`src/context`**: Usado para o `AuthContext`, que gerencia o estado de autenticação globalmente.
*   **`src/firebase.js`**: Centraliza a configuração do Firebase, facilitando a manutenção.
*   **`App.js`**: Orquestra as rotas principais e o provedor de autenticação.

## Funcionalidades

*   **Autenticação de Usuário**:
    *   Login social utilizando contas Google através do Firebase Authentication.
    *   Rotas protegidas que só podem ser acessadas por usuários autenticados.
    *   Logout de usuário.
*   **Feed de Postagens**:
    *   Exibição de postagens em ordem cronológica decrescente.
    *   Atualização do feed em tempo real com novas postagens (graças ao Firestore).
    *   Informações do autor (nome e avatar) e tempo da postagem.
*   **Criação de Postagens**:
    *   Interface modal para criar novas postagens de texto.
    *   As postagens são salvas no Firestore e refletidas imediatamente no feed.
*   **Interação com Postagens**:
    *   Sistema de "curtidas" em posts.
    *   Atualização otimista da UI para curtidas, proporcionando feedback instantâneo.
    *   Contagem de curtidas atualizada em tempo real.
*   **Interface do Usuário**:
    *   Layout responsivo utilizando React Bootstrap.
    *   Navegação principal através de uma barra lateral (`Sidebar`).
    *   Modais para ações como criar post e exibir informações de funcionalidades em desenvolvimento.
    *   Página 404 customizada para rotas não encontradas.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

### `npm start`

Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

A página será recarregada automaticamente se você fizer alterações no código.\
Você também verá quaisquer erros de lint (análise de código) no console.

### `npm test`

Inicia o executor de testes no modo interativo de observação.\
Veja a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações. (Nota: Este projeto ainda não possui uma suíte de testes robusta).

### `npm run build`

Compila a aplicação para produção na pasta `build`.\
Ele agrupa corretamente o React em modo de produção e otimiza a compilação para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem hashes para versionamento.\
Sua aplicação está pronta para ser implantada!

Veja a seção sobre [implantação (deployment)](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**Nota: esta é uma operação de sentido único. Uma vez que você `eject`, você não pode voltar!**

Se você não estiver satisfeito com a ferramenta de compilação e as escolhas de configuração, você pode `eject` a qualquer momento. Este comando removerá a dependência única de compilação do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc.) diretamente para o seu projeto para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas eles apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você não precisa usar `eject`. O conjunto de funcionalidades curado é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar este recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estivesse pronto para isso.
