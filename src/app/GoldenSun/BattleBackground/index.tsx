import React from 'react';
import './index.scss';

interface BattleBackgroundProps {
  style?: React.CSSProperties;
  position?: { x: number; y: number };
  zoom?: number;
  src: string;
}

/**
 * Takes a background and makes it horizontally wrappable
 */
const BattleBackground = ({
  style,
  position, // = { x: -20, y: -30 },
  zoom = 1000,
  src,
}: BattleBackgroundProps) => {
  let pos = ``;
  if (zoom) pos = `scale(${zoom}%) `;
  if (position)
    pos += `translateX(${position.x}px) translateY(${position.y}px)`;

  return (
    <div className="battle-background" style={style}>
      <div className="bs-view" style={{ transform: pos }}>
        <img className="background-scene" src={src} alt="[Background Scene]" />
        <img className="background-scene" src={src} alt="[Background Scene]" />
      </div>
    </div>
  );
};

export default BattleBackground;
