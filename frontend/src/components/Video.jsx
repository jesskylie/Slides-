import React from 'react';

/**
 * Image that is added to slide
 */
export default function Image ({ sizeWidth, sizeHeight, videoURL, autoplay }) {
  const widthAsNum = parseInt(sizeWidth) * 0.01
  const heightAsNum = parseInt(sizeHeight) * 0.01
  let autoplayString = '';
  if (autoplay === 'Yes') {
    autoplayString = '&autoplay=1&mute=1';
  }
  const style = {
    width: `${widthAsNum * 1000}px`,
    height: `${heightAsNum * 500}px`,
  };
  return (
    <>
      <iframe src={videoURL + autoplayString} style={style}></iframe>
    </>
  );
}
