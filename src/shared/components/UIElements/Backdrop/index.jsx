import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-portal'
    )
  );
};

export default Backdrop;
