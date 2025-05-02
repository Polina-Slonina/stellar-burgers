import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from './modal';

interface InfoModalProps {
  children: React.ReactNode; // Указание типа для children
}

export const InfoModal: FC<InfoModalProps> = ({ children }) => {
  const { id, number } = useParams(); // Получаем параметры из URL
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1); // Возврат к предыдущей странице
  };

  let modalTitle = '';
  if (id) {
    modalTitle = 'Детали ингредиента';
  } else if (number) {
    modalTitle = `#0${number}`;
  }

  return (
    <Modal title={modalTitle} onClose={onClose}>
      {children}
    </Modal>
  );
};
