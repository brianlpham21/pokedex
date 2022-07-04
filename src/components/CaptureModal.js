import React from 'react';
import Modal from 'react-modal';
import { capitalizeString } from '../helpers/capitalizeString';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function CaptureModal({ modalIsOpen, setModalIsOpen, detailPokemonData }) {
  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Capturing {capitalizeString(detailPokemonData.name)}</div>
        <div><input type="text" /></div>
        <div><input type="text" /></div>
        <div><input type="text" /></div>
        <div><button>Capture</button></div>
      </Modal>
  )
}
