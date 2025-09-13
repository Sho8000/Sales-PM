'use client'

import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface ColorPickerProps {
  colorPicker: ReactNode;
}

export default function ModalPortal({colorPicker}:ColorPickerProps) {
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    }}>
      {colorPicker}
    </div>,
    document.body
  );
}