import { useState } from "react";

export const useModal = (initialState: boolean = false) => {
  const [openModal, setOpenModal] = useState(initialState);

  const openModalButton = () => setOpenModal(true);
  const closeModalButton = () => setOpenModal(false);

  return { openModal, openModalButton, closeModalButton };
};
