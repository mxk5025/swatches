import React from 'react';
import './Swatch.css'

export default function Swatch({color}) {

  return (
    <div className="swatch" style={{backgroundColor: color}}>
      <span></span>
    </div>
  );
}
