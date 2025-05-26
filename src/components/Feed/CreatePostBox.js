import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que este caminho está correto
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";

// Componente para criar uma nova postagem diretamente no feed.
// Permite ao usuário logado inserir texto e submeter como um novo post.
// Este componente foi descontinuado em favor do CreatePostModal, mas o código é mantido como referência ou para reutilização futura.
function CreatePostBox() {
  // Estado para armazenar o texto da postagem.
  // `postText` guarda o valor atual do campo de texto.
  // `setPostText` é a função para atualizar esse valor.
  const [postText, setPostText] = useState('');

  // Estado para controlar o status de "postando".
  // `isPosting` é um booleano que indica se uma submissão de post está em andamento.
  // Usado para desabilitar o botão de postar e fornecer feedback visual.
  const [isPosting, setIsPosting] = useState(false);

  // Obtém o usuário atual do contexto de autenticação.
  // Necessário para associar o post ao autor e verificar se o usuário pode postar.
  const { currentUser } = useAuth();

  // Função para lidar com a submissão do formulário de postagem.
  // É assíncrona devido à chamada ao Firestore para adicionar o documento.
  const handlePostSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar a página).
    e.preventDefault();

    // Validação: verifica se o texto não está vazio e se o usuário está logado.
    // `.trim()` remove espaços em branco do início e fim do texto.
    if (!postText.trim() || !currentUser) {
      alert("O texto do post não pode estar vazio e você precisa estar logado.");
      return; // Interrompe a função se a validação falhar.
    }

    // Define `isPosting` como true para indicar que o processo de postagem começou.
    // Isso pode ser usado para desabilitar o botão de submit e mostrar um spinner, por exemplo.
    setIsPosting(true);
    try {
      // Adiciona um novo documento à coleção "posts" no Firestore.
      // `addDoc` cria um documento com um ID gerado automaticamente.
      // `collection(db, "posts")` referencia a coleção "posts".
      await addDoc(collection(db, "posts"), {
        text: postText, // O conteúdo textual do post.
        authorName: currentUser.displayName || "Usuário Anônimo", // Nome do autor; usa "Usuário Anônimo" se não disponível.
        authorPhotoURL: currentUser.photoURL || defaultAvatar, // URL da foto do autor; usa um avatar padrão se não disponível.
        authorId: currentUser.uid, // ID único do usuário, para referência e controle de acesso.
        timestamp: serverTimestamp(), // Timestamp do servidor, para ordenação cronológica e consistência.
        likes: 0,                 // Inicializa a contagem de curtidas como 0.
        likedBy: [],              // Inicializa a lista de usuários que curtiram como vazia.
        commentsCount: 0,         // Inicializa a contagem de comentários como 0.
      });
      // Limpa o campo de texto após a submissão bem-sucedida.
      setPostText(''); 
    } catch (error) {
      // Em caso de erro na comunicação com o Firestore, exibe um erro no console e um alerta ao usuário.
      console.error("Erro ao criar post:", error);
      alert("Falha ao criar post. Verifique o console para detalhes.");
    }
    // Define `isPosting` como false ao final do processo (sucesso ou falha).
    setIsPosting(false);
  };

  // Se não houver usuário logado, o componente não renderiza nada (retorna null).
  // Isso impede que usuários não autenticados vejam ou tentem usar a caixa de postagem.
  if (!currentUser) {
    return null; 
  }

  // Renderização do componente.
  return (
    <div className="create-post-box"> {/* Container principal da caixa de postagem. */}
      <div className="user-avatar-input"> {/* Container para o avatar e o formulário. */}
        {/* Imagem do avatar do usuário. Utiliza a foto do perfil do Google ou um avatar padrão.
            `onError` é um fallback para caso a imagem do usuário não carregue, substituindo-a pelo avatar padrão. */}
        <Image 
          src={currentUser.photoURL || defaultAvatar} 
          roundedCircle // Estilo para deixar a imagem redonda.
          alt="Seu avatar" 
          onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
        />
        {/* Formulário de submissão do post. `w-100` faz o formulário ocupar toda a largura disponível. */}
        <Form onSubmit={handlePostSubmit} className="w-100">
          <Form.Group controlId="postTextArea"> {/* Agrupa o label e o input da área de texto. */}
            <Form.Control
              as="textarea" // Define o input como uma área de texto.
              rows={3} // Altura inicial da área de texto em linhas.
              // Placeholder dinâmico com o primeiro nome do usuário.
              placeholder={`No que você está pensando, ${currentUser.displayName?.split(' ')[0] || 'Usuário'}?`}
              value={postText} // Vincula o valor do input ao estado `postText`.
              onChange={(e) => setPostText(e.target.value)} // Atualiza `postText` a cada mudança no input.
              disabled={isPosting} // Desabilita o input enquanto o post está sendo enviado.
            />
          </Form.Group>
          {/* Container para ações adicionais e o botão de postar. */}
          <div className="create-post-actions mt-2">
            <div className="icons"> {/* Ícones para funcionalidades futuras (imagem, emoji). */}
              {/* Ícone para adicionar imagem. Atualmente, exibe um alerta indicando que a funcionalidade não está implementada. */}
              <BsCardImage size={22} onClick={() => alert('Upload de imagem ainda não implementado.')}/>
              {/* Ícone para adicionar emoji. Similarmente, exibe um alerta. */}
              <BsEmojiSmile size={22} onClick={() => alert('Seletor de emoji ainda não implementado.')}/>
            </div>
            {/* Botão para submeter o post. */}
            <Button 
              variant="primary" 
              type="submit" 
              // Desabilita o botão se `isPosting` for true ou se `postText` estiver vazio (após trim).
              disabled={isPosting || !postText.trim()} 
              className="btn-postar" // Classe para estilização customizada.
            >
              {/* Texto do botão muda para "Postando..." durante a submissão. */}
              {isPosting ? 'Postando...' : 'Postar'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePostBox;