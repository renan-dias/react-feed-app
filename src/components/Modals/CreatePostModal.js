// src/components/Modals/CreatePostModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import defaultAvatar from '../../assets/default-avatar.png'; // Certifique-se que este caminho está correto
import { BsCardImage } from "react-icons/bs"; // Ícone para adicionar imagem.

// Componente CreatePostModal.
// Um modal que permite aos usuários criar e submeter novas postagens.
// Props:
// - `show`: booleano que controla a visibilidade do modal.
// - `handleClose`: função para fechar o modal.
function CreatePostModal({ show, handleClose }) {
  // Estado para o texto da postagem.
  const [postText, setPostText] = useState('');
  // Estado para indicar se a postagem está em andamento (para feedback visual e desabilitar inputs).
  const [isPosting, setIsPosting] = useState(false);
  
  // Comentários sobre funcionalidades futuras (upload de imagem):
  // `postImage` armazenaria o arquivo da imagem selecionada.
  // `imagePreview` armazenaria a URL temporária para preview da imagem.
  // Futuramente: const [postImage, setPostImage] = useState(null);
  // Futuramente: const [imagePreview, setImagePreview] = useState('');

  // Acesso ao usuário logado via AuthContext. Necessário para identificar o autor do post.
  const { currentUser } = useAuth();

  // Função para lidar com a submissão do formulário de criação de post.
  const handlePostSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página do formulário.

    // Validação: verifica se há conteúdo (texto) e se o usuário está logado.
    // A validação de imagem (`!postImage`) está comentada, pois a funcionalidade de imagem ainda não foi implementada.
    if (!postText.trim() /* && !postImage */) { 
      alert("O post precisa de conteúdo (texto ou imagem).");
      return; // Interrompe se a validação falhar.
    }
    if (!currentUser) {
      alert("Você precisa estar logado para postar.");
      return; // Interrompe se o usuário não estiver logado.
    }

    setIsPosting(true); // Indica que o processo de postagem iniciou.
    try {
      // Lógica para upload de imagem (a ser implementada futuramente):
      // O código para fazer upload da `postImage` para o Firebase Storage e obter a `imageUrl` viria aqui.
      // let imageUrl = '';
      // if (postImage) { /* ... lógica de upload da imagem e obtenção da URL ... */ }

      // Adiciona o novo post à coleção "posts" no Firestore.
      await addDoc(collection(db, "posts"), {
        text: postText, // Conteúdo textual do post.
        // imageUrl: imageUrl, // URL da imagem (a ser descomentada quando a funcionalidade estiver pronta).
        authorName: currentUser.displayName || "Usuário Anônimo", // Nome do autor.
        authorPhotoURL: currentUser.photoURL || defaultAvatar, // Foto do autor.
        authorId: currentUser.uid, // ID do autor.
        timestamp: serverTimestamp(), // Timestamp do servidor para ordenação.
        likes: 0, // Inicializa contagem de likes.
        likedBy: [], // Inicializa lista de quem curtiu.
        commentsCount: 0, // Inicializa contagem de comentários.
      });
      
      // Limpa os estados após a submissão bem-sucedida.
      setPostText('');
      // setPostImage(null); // Limpar estado da imagem (futuro).
      // setImagePreview(''); // Limpar preview da imagem (futuro).
      handleClose(); // Fecha o modal.
    } catch (error) {
      console.error("Erro ao criar post:", error); // Registra o erro no console.
      alert("Falha ao criar post. Verifique o console para detalhes."); // Informa o usuário.
    }
    setIsPosting(false); // Indica que o processo de postagem terminou (sucesso ou falha).
  };

  // Função para lidar com a seleção de imagem (a ser implementada futuramente):
  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setPostImage(e.target.files[0]);
  //     setImagePreview(URL.createObjectURL(e.target.files[0])); // Cria URL local para preview.
  //   }
  // };

  // Renderização do Modal.
  // `backdrop="static"` e `keyboard={false}` impedem o fechamento do modal ao clicar fora ou pressionar Esc,
  // forçando o usuário a usar o botão de fechar ou concluir a ação, útil durante o `isPosting`.
  return (
    <Modal show={show} onHide={handleClose} centered backdrop={isPosting ? "static" : true} keyboard={!isPosting}>
      <Modal.Header closeButton={!isPosting}> {/* Desabilita botão de fechar enquanto posta */}
        <Modal.Title>Criar nova postagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Seção de informações do usuário (avatar e nome). */}
        <div className="d-flex align-items-start mb-3">
          <Image 
            src={currentUser?.photoURL || defaultAvatar} 
            roundedCircle 
            alt="Seu avatar" 
            style={{ width: '45px', height: '45px', marginRight: '10px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }} // Fallback para avatar padrão.
          />
          <span style={{ fontWeight: '500', marginTop: '10px' }}>{currentUser?.displayName || "Usuário"}</span>
        </div>
        {/* Formulário para o texto do post. */}
        <Form onSubmit={handlePostSubmit}>
          <Form.Group controlId="postModalTextArea">
            <Form.Control
              as="textarea"
              rows={5} // Altura da área de texto.
              placeholder={`No que você está pensando, ${currentUser?.displayName?.split(' ')[0] || 'Usuário'}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              disabled={isPosting} // Desabilita enquanto `isPosting` for true.
              // Estilos para remover bordas e sombras padrão, dando um look mais "limpo".
              style={{ border: 'none', boxShadow: 'none', resize: 'none', paddingLeft: 0 }} 
            />
          </Form.Group>
          
          {/* Placeholder para preview da imagem (a ser implementado futuramente). */}
          {/* {imagePreview && (
            <div className="my-2 text-center">
              <Image src={imagePreview} thumbnail style={{ maxHeight: '200px' }} />
            </div>
          )} */}

          {/* Seção de ações do modal: adicionar foto e botão de postar. */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <div>
              {/* Botão para adicionar foto (funcionalidade futura). 
                  Atualmente, exibe um alerta. */}
              <Button 
                variant="light" 
                onClick={() => alert('Upload de fotos será implementado em breve!')} 
                title="Adicionar foto"
                className="me-2"
                disabled={isPosting} // Desabilita enquanto posta.
              >
                <BsCardImage size={22} style={{color: "#4DB6AC"}}/>
              </Button>
              {/* Outros ícones (ex: emoji) poderiam ser adicionados aqui. */}
            </div>
            {/* Botão para submeter o post. */}
            <Button 
              variant="primary" 
              type="submit" 
              // Desabilita se `isPosting` for true ou se não houver texto (a validação de imagem está comentada).
              disabled={isPosting || (!postText.trim()/* && !postImage*/)} 
              className="btn-postar" // Classe para estilização.
            >
              {/* Mostra um Spinner dentro do botão quando `isPosting` for true. */}
              {isPosting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" /> 
              ) : null}
              {isPosting ? 'Postando...' : 'Postar'} {/* Texto dinâmico do botão. */}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;