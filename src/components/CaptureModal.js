import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

import { addCaptured } from '../features/pokemon/pokemonSlice';

import { capitalizeString } from '../helpers';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    textAlign: 'center',
    borderRadius: '16px'
  },
};

const inputs = [
  {
    id: 'nickname',
    text: 'Nickname',
    required: false,
  },
  {
    id: 'capturedDate',
    text: 'Captured Date',
    required: true,
  },
  {
    id: 'capturedLevel',
    text: 'Captured Level',
    required: true,
  },
];

export default function CaptureModal({ modalIsOpen, setModalIsOpen, detailPokemonData }) {
  const dispatch = useDispatch();
  const initialState = { nickname: '', capturedDate: '', capturedLevel: '' };
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState(false);

  const closeModal = () => {
    setValues(initialState)
    setModalIsOpen(false);
  }

  const handleInput = ({ target: { id, value } }) => {
    setValues({ ...values, [id]: value });
    setIsValid(values.capturedDate !== '' && values.capturedLevel !== '');
  }

  const handleCapture = () => {
    if (isValid) {
      dispatch(addCaptured({ ...detailPokemonData, ...values }));
      closeModal();
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="modal-title">Capturing {capitalizeString(detailPokemonData.name)}</div>
        <div className="modal-input-container">
          {inputs.map((i) => <input key={i.id} className="modal-input" onChange={handleInput} value={values[i.id]} type="text" placeholder={i.text} id={i.id} required={i.required} />)}
        </div>
        <div><button className={`modal-capture-button ${!isValid && 'invalid'}`} disabled={!isValid} onClick={handleCapture}>Capture</button></div>
      </motion.div>
    </Modal>
  )
}
