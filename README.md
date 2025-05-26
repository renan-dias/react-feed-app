# Projeto Mini Rede Social com React e Firebase

## Sumário

1.  [Descrição Geral](#descrição-geral)
    *   [Principais Recursos](#principais-recursos)
2.  [Tecnologias Utilizadas](#tecnologias-utilizadas)
3.  [Pré-requisitos](#pré-requisitos)
4.  [Configuração e Instalação](#configuração-e-instalação)
    *   [1. Clone o Repositório](#1-clone-o-repositório)
    *   [2. Instale as Dependências](#2-instale-as-dependências)
    *   [3. Configure o Firebase](#3-configure-o-firebase)
5.  [Executando o Projeto](#executando-o-projeto)
6.  [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
    *   [Autenticação de Usuário](#autenticação-de-usuário)
    *   [Feed de Postagens](#feed-de-postagens)
    *   [Criação de Postagens](#criação-de-postagens)
    *   [Interação com Postagens](#interação-com-postagens)
    *   [Interface do Usuário](#interface-do-usuário)
7.  [Estrutura do Projeto](#estrutura-do-projeto)
    *   [Visão Geral da Estrutura de Pastas](#visão-geral-da-estrutura-de-pastas)
    *   [Destaques da Estrutura](#destaques-da-estrutura)
8.  [Scripts NPM Disponíveis](#scripts-npm-disponíveis)
    *   [`npm start`](#npm-start)
    *   [`npm test`](#npm-test)
    *   [`npm run build`](#npm-run-build)
    *   [`npm run eject`](#npm-run-eject)

---

## Descrição Geral

Este projeto é uma aplicação web de mini rede social desenvolvida com React e Firebase. O seu propósito principal é demonstrar a integração dessas tecnologias para criar uma plataforma interativa onde usuários podem se autenticar, criar postagens, visualizar um feed de atividades e interagir com o conteúdo. É um projeto educativo focado em boas práticas de desenvolvimento frontend e backend como serviço (BaaS).

### Principais Recursos
*   Autenticação de usuários com Google (Firebase Authentication).
*   Criação e exibição de postagens em tempo real (Firestore).
*   Feed de postagens ordenado cronologicamente.
*   Interação com posts (curtidas).
*   Design responsivo utilizando React Bootstrap.
*   Roteamento de páginas com React Router.
*   Modal para criação de posts, melhorando a experiência do usuário.

---

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

---

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [npm](https://www.npmjs.com/) (geralmente vem instalado com o Node.js)
*   [Git](https://git-scm.com/)

Você também precisará de uma conta Firebase e um projeto configurado. As credenciais do Firebase devem ser adicionadas ao arquivo `src/firebase.js` (ou preferencialmente, via variáveis de ambiente, como alertado no próprio arquivo).

---

## Configuração e Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento local:

### 1. Clone o Repositório
```bash
git clone <URL_DO_REPOSITORIO_AQUI>
cd <NOME_DA_PASTA_DO_PROJETO>
```
**Observação:** Substitua `<URL_DO_REPOSITORIO_AQUI>` pela URL real do repositório e `<NOME_DA_PASTA_DO_PROJETO>` pelo nome da pasta que será criada.

### 2. Instale as Dependências
Execute o comando abaixo na raiz do projeto para instalar todas as bibliotecas e pacotes necessários listados no `package.json`.
```bash
npm install
```

### 3. Configure o Firebase
*   Crie um projeto no [console do Firebase](https://console.firebase.google.com/).
*   Adicione um aplicativo da Web ao seu projeto Firebase.
*   Na configuração do seu projeto no console do Firebase, encontre e copie o objeto de configuração do Firebase (SDK setup snippet).
*   **Importante:** Conforme alertado no arquivo `src/firebase.js`, o ideal é configurar estas credenciais usando variáveis de ambiente para maior segurança. Crie um arquivo `.env` na raiz do projeto com o seguinte formato:
    ```env
    REACT_APP_FIREBASE_API_KEY=SUA_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=SEU_APP_ID
    REACT_APP_FIREBASE_MEASUREMENT_ID=SEU_MEASUREMENT_ID (opcional)
    ```
    Substitua os valores `SUA_...` e `SEU_...` pelas credenciais reais do seu projeto Firebase.
*   O arquivo `src/firebase.js` já está configurado para tentar ler essas variáveis de ambiente. Certifique-se de que o arquivo `.env` esteja listado no seu `.gitignore` para não expor suas chaves.

---

## Executando o Projeto

Após a instalação e configuração, você pode iniciar o servidor de desenvolvimento:

```bash
npm start
```

Este comando executa a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no seu navegador. A página será recarregada automaticamente se você fizer edições no código. Você também verá quaisquer erros de lint no console.

---

## Funcionalidades Detalhadas

### Autenticação de Usuário
*   **Login Social com Google:** Permite que usuários se autentiquem de forma rápida e segura utilizando suas contas Google, gerenciado pelo Firebase Authentication.
*   **Rotas Protegidas:** Certas seções da aplicação, como o feed principal e a capacidade de postar, são acessíveis apenas para usuários autenticados. O componente `ProtectedRoute` gerencia esse controle.
*   **Logout:** Usuários podem encerrar sua sessão de forma segura.

### Feed de Postagens
*   **Exibição Cronológica:** As postagens são listadas em ordem decrescente de criação, mostrando as mais recentes primeiro.
*   **Atualização em Tempo Real:** Graças ao Firestore, novas postagens ou atualizações (como curtidas) são refletidas no feed sem a necessidade de recarregar a página.
*   **Detalhes do Post:** Cada post exibe o nome e avatar do autor, o texto da postagem e o tempo relativo desde a sua criação (ex: "há 5 minutos").

### Criação de Postagens
*   **Interface Modal:** Uma janela modal dedicada é utilizada para a criação de novas postagens, proporcionando uma experiência de usuário focada e sem interrupções na navegação principal.
*   **Conteúdo de Texto:** Usuários podem inserir o texto que desejam compartilhar.
*   **Persistência Imediata:** As postagens são salvas no Firestore e aparecem no feed de todos os usuários em tempo real.

### Interação com Postagens
*   **Sistema de Curtidas:** Usuários podem curtir e descurtir postagens.
*   **Feedback Visual Imediato:** A interface é atualizada otimisticamente ao curtir/descurtir, mostrando a mudança antes mesmo da confirmação do backend, o que melhora a percepção de responsividade.
*   **Contagem de Curtidas:** A quantidade de curtidas é exibida e atualizada em tempo real para todos os usuários.

### Interface do Usuário
*   **Design Responsivo:** Utiliza React Bootstrap para garantir que a aplicação se adapte a diferentes tamanhos de tela (desktops, tablets, smartphones).
*   **Navegação Principal:** Uma barra lateral (`Sidebar`) persistente oferece acesso às principais seções e funcionalidades, como feed, perfil (implícito) e logout.
*   **Modais Interativos:** Além da criação de posts, modais genéricos são usados para informar sobre funcionalidades em desenvolvimento, evitando interrupções abruptas na experiência.
*   **Página 404 Customizada:** Uma página de erro amigável é exibida para rotas não encontradas, com um link para retornar à página inicial.

---

## Estrutura do Projeto

### Visão Geral da Estrutura de Pastas
```
/
├── public/             # Arquivos estáticos e HTML base
│   └── index.html      # Ponto de entrada HTML
├── src/                # Código fonte da aplicação
│   ├── assets/         # Imagens, fontes e outros recursos estáticos
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── Auth/       # Componentes de autenticação (Login, ProtectedRoute)
│   │   ├── Feed/       # Componentes relacionados ao feed (Feed, Post)
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

### Destaques da Estrutura
*   **`src/components`**: Contém subpastas para diferentes categorias de componentes (Autenticação, Feed, Layout, etc.), promovendo a modularidade e facilitando a localização e manutenção do código.
*   **`src/context`**: Utilizado para o `AuthContext`, que gerencia o estado de autenticação de forma global, permitindo que qualquer componente acesse informações do usuário logado.
*   **`src/firebase.js`**: Centraliza a configuração e inicialização do Firebase SDK, tornando mais fácil a gestão das credenciais e dos serviços Firebase utilizados.
*   **`App.js`**: Atua como o orquestrador principal da aplicação, configurando o `AuthProvider` e definindo as rotas principais com `React Router`.

---

## Scripts NPM Disponíveis

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

---
