import React from 'react';

export default function TextBox ({ text, fontSize, colour, onDelete, width, height }) {
  const widthAsNum = parseInt(width) * 0.01
  const heightAsNum = parseInt(height) * 0.01
  const style = {
    padding: '10px',
    fontSize: `${fontSize}em`,
    color: colour,
    textAlign: 'left',
    width: `${widthAsNum * 1000}px`,
    height: `${heightAsNum * 500}px`,
    overflow: 'hidden'
  };

  if (text) {
    style.border = '2px solid #d4d4d4';
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
  }

  return (
    <div style={style} onContextMenu={handleDelete}>
      {text}
    </div>
  );
}
