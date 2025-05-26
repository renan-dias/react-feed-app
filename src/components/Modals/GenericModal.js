import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Componente GenericModal.
// Um componente de modal reutilizável e configurável para exibir mensagens simples ou alertas.
// Props:
// - `show`: booleano que controla a visibilidade do modal.
// - `handleClose`: função para ser chamada quando o modal deve ser fechado (ex: clique no botão "Fechar" ou no 'x').
// - `title`: string para o título do modal.
// - `body`: string ou JSX para o conteúdo principal (corpo) do modal.
function GenericModal({ show, handleClose, title, body }) {
  // O componente Modal do React Bootstrap é usado como base.
  // `show={show}`: controla a exibição do modal com base na prop `show`.
  // `onHide={handleClose}`: especifica a função a ser chamada quando o modal solicita o fechamento
  // (ex: clique no botão 'x' do cabeçalho, ou tecla Esc, ou clique fora se `backdrop` não for `static`).
  // `centered`: prop para centralizar o modal verticalmente na tela.
  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Cabeçalho do modal. 
          `closeButton` adiciona o botão 'x' padrão para fechar o modal. */}
      <Modal.Header closeButton>
        {/* Título do modal, definido pela prop `title`. */}
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {/* Corpo do modal, contendo o conteúdo principal definido pela prop `body`. */}
      <Modal.Body>{body}</Modal.Body>
      {/* Rodapé do modal. */}
      <Modal.Footer>
        {/* Botão "Fechar" para dispensar o modal. 
            `onClick={handleClose}` chama a função fornecida para fechar o modal.
            `variant="secondary"` define o estilo do botão. */}
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;