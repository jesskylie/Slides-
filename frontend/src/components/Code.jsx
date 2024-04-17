import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/**
 * Code box that appears on slide when user enters code
 */
export default function Code ({ sizeWidth, sizeHeight, code, fontSize }) {
  const widthAsNum = parseInt(sizeWidth) * 0.01
  const heightAsNum = parseInt(sizeHeight) * 0.01

  return (
    <div style={{ width: `${widthAsNum * 1000}px`, height: `${heightAsNum * 500}px`, fontSize: { fontSize } }}>
        <SyntaxHighlighter style={atomOneDark} language="javascript">
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
