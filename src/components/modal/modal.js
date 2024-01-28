import React, { useState } from 'react';
import '../../assets/css/modal.css'; // You may need to create a separate CSS file for styling
import { ImCross } from "react-icons/im";
import AddCampGround from '../form/addCampground';

const Modal = ({title,closeModal,children}) => {
  return (
    <div>
        <div className="modal-overlay" >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className='imcross'>
            <ImCross  onClick={()=>closeModal()}/>
            </div>
            <h2>{title}</h2>
            {children}
          </div>
        </div>
    </div>
  );
};

export default Modal;
