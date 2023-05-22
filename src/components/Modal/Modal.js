import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return createPortal(
      <div className={css.modalBackdrop} onClick={this.handleBackDrop}>
        <div className={css.modalContent}>
          <img src={imageUrl} alt="selected_image" />
        </div>
      </div>,
      modalRoot
    );
  }
}
