import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { addCaptured } from '../features/pokemon/pokemonSlice';

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
  const dispatch = useDispatch();
  const [values, setValues] = useState({ nickname: '', capturedDate: '', capturedLevel: '' });

  const handleInput = ({ target: { id, value } }) => {
    setValues({ ...values, [id]: value });
  }

  const handleCapture = () => {
    dispatch(addCaptured({ ...detailPokemonData, ...values }))
  }

  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Capturing {capitalizeString(detailPokemonData.name)}</div>
        <div><input onChange={handleInput} value={values['nickname']} type="text" placeholder='Nickname' id="nickname" /></div>
        <div><input onChange={handleInput} value={values['capturedDate']} type="text" placeholder="Captured Date" id="capturedDate" /></div>
        <div><input onChange={handleInput} value={values['capturedLevel']} type="text" placeholder="Captured Level" id="capturedLevel" /></div>
        <div><button onClick={handleCapture}>Capture</button></div>
      </Modal>
  )
}
