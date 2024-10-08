import React from 'react';

/**
 * Text box that is added to slide
 */
export default function TextBox ({ text, fontSize, colour, onDelete, width, height, layer, onDoubleClick, textId }) {
  const widthAsNum = parseInt(width) * 0.01
  const heightAsNum = parseInt(height) * 0.01
  const style = {
    position: 'absolute',
    top: `${layer * 500}px`,
    left: 0,
    padding: '10px',
    fontSize: `${fontSize}em`,
    color: colour,
    textAlign: 'left',
    width: `${widthAsNum * 1000}px`,
    height: `${heightAsNum * 500}px`,
    overflow: 'hidden',
    zIndex: layer
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

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (onDoubleClick) {
      onDoubleClick(textId);
    }
  }

  return (
    <div style={style} onContextMenu={handleDelete} onDoubleClick={handleDoubleClick}>
      {text}
    </div>
  );
}
