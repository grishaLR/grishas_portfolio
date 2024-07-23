import React from 'react';
import { Typewriter } from '@components';
import './styles.css';

export default (() => {
  return (
    <div className="home-container">
      <img
        className="profile-picture"
        src="/assets/grishasheadshot.png"
        alt="SVG picture of Gregory Levine-Rozenvayn"
      />
      <Typewriter />
    </div>
  );
}) as React.FC;
