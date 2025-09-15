'use client'

import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface ColorPickerProps {
  showTopItem: ReactNode;
}

export default function ModalPortal({showTopItem}:ColorPickerProps) {
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    }}>
      {showTopItem}
    </div>,
    document.body
  );
}