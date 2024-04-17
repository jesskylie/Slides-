import React from 'react';

/**
 * Image that is added to slide page
 */
export default function Image ({ sizeWidth, sizeHeight, imageURL, imageDescription }) {
  const widthAsNum = parseInt(sizeWidth) * 0.01
  const heightAsNum = parseInt(sizeHeight) * 0.01
  const style = {
    padding: '10px',
    width: `${widthAsNum * 1000}px`,
    height: `${heightAsNum * 500}px`,
  };

  return (
    <img src={imageURL} alt={imageDescription} style={style}></img>
  );
}
