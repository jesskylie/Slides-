import React from 'react';

export default function TextBox ({ text, fontSize, colour, onDelete }) {
  const style = {
    padding: '10px',
    fontSize: `${fontSize}em`,
    color: colour,
    textAlign: 'left',
  };

  if (text) {
    style.border = '1px solid #d4d4d4'; // Soft grey border
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
