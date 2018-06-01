import React from 'react';

import './Elements.css';

import backBtnIcon from '../assets/arrow-left.svg';

export const BackButton = props => (
  <button className="App-backButton icon" {...props}>
    <img src={backBtnIcon} alt="Go back" />
  </button>
);
