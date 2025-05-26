import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Importa a instância `auth` do Firebase, configurada em `firebase.js`.
import { 
  onAuthStateChanged,     // Listener do Firebase para mudanças no estado de autenticação.
  signOut as firebaseSignOut, // Função de logout do Firebase, renomeada para evitar conflito de nome.
  signInWithPopup,        // Função para login com popup (ex: Google).
  GoogleAuthProvider      // Provedor de autenticação do Google.
} from 'firebase/auth';

// Cria um Contexto React para autenticação.
// O Contexto permite que os dados de autenticação (usuário logado, funções de login/logout)
// sejam compartilhados entre componentes sem a necessidade de passar props manualmente através da árvore de componentes.
const AuthContext = createContext();

// Hook customizado `useAuth`.
// Simplifica o uso do AuthContext pelos componentes. Em vez de `useContext(AuthContext)` diretamente,
// os componentes podem usar `useAuth()` para acessar o contexto.
// Isso também centraliza a lógica de acesso ao contexto, facilitando futuras modificações.
export function useAuth() {
  return useContext(AuthContext);
}

// Componente Provedor de Autenticação (`AuthProvider`).
// Este componente envolve partes da aplicação (geralmente o App inteiro) que precisam de acesso
// ao contexto de autenticação.
// Ele gerencia o estado do usuário (`currentUser`), o estado de carregamento (`loading`),
// e provê as funções de login e logout.
export function AuthProvider({ children }) {
  // Estado para armazenar o objeto do usuário atualmente logado.
  // `null` se nenhum usuário estiver logado.
  const [currentUser, setCurrentUser] = useState(null);
  
  // Estado para indicar se o estado de autenticação inicial ainda está sendo verificado.
  // `true` enquanto `onAuthStateChanged` ainda não retornou o primeiro status do usuário.
  // Isso é útil para evitar renderizar partes da UI que dependem do `currentUser` antes que ele seja definido.
  const [loading, setLoading] = useState(true);

  // Função para realizar login com o Google.
  // Utiliza `signInWithPopup` do Firebase Authentication.
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider(); // Cria uma instância do provedor de autenticação do Google.
    return signInWithPopup(auth, provider); // Inicia o processo de login com popup. Retorna uma Promise.
  }

  // Função para realizar logout.
  // Utiliza `firebaseSignOut` (renomeado de `signOut`) do Firebase Authentication.
  function signOut() {
    return firebaseSignOut(auth); // Realiza o logout. Retorna uma Promise.
  }

  // useEffect para observar mudanças no estado de autenticação do Firebase.
  // Este é o principal mecanismo para manter `currentUser` sincronizado com o Firebase.
  useEffect(() => {
    // `onAuthStateChanged` registra um observador.
    // O callback é chamado quando o usuário faz login, logout, ou quando o token de autenticação muda.
    // `user` será o objeto do usuário se logado, ou `null` se deslogado.
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Atualiza o estado `currentUser`.
      setLoading(false);    // Define `loading` como false, pois o estado inicial foi determinado.
    });

    // Função de limpeza do useEffect.
    // `unsubscribe` remove o observador `onAuthStateChanged` quando o componente `AuthProvider` é desmontado.
    // Isso é crucial para evitar memory leaks.
    return unsubscribe;
  }, []); // O array de dependências vazio `[]` garante que o efeito execute apenas uma vez (na montagem) e limpe na desmontagem.

  // Objeto `value` que será fornecido aos consumidores do AuthContext.
  // Contém o usuário atual e as funções de autenticação.
  const value = {
    currentUser,
    signInWithGoogle,
    signOut
    // Adicionar `loading` ao contexto se outros componentes precisarem saber se a autenticação inicial ainda está pendente.
    // loading 
  };

  // O `AuthContext.Provider` disponibiliza o `value` para todos os componentes filhos (`children`)
  // que consumirem este contexto.
  // `!loading && children`: Renderiza os `children` apenas quando o estado de `loading` for `false`.
  // Isso garante que a aplicação (ou partes dela) só seja renderizada após a verificação inicial
  // do estado de autenticação, evitando flashes de conteúdo ou redirecionamentos incorretos.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Exporta o AuthContext diretamente caso seja necessário para usos mais avançados,
// embora o hook `useAuth` seja a forma preferida de consumo.
export default AuthContext;

// Comentário original mantido para referência, mas a explicação detalhada está acima.
// AuthContext.js   
// Este arquivo define o contexto de autenticação para o aplicativo, permitindo que os componentes acessem o estado de autenticação do usuário e as funções de login e logout.
// Ele usa o Firebase Authentication para gerenciar o login com Google e o estado do usuário autenticado.