import { createContext, useState } from 'react';
import spriteSheet from '../sprites/battle-screen-spritesheet.png';
import getSprites from '../../util/sprite-sheet-parser';

export const SpriteControllerContext = createContext(
  {} as {
    getSpriteByMap: (map: [number, number, number, number]) => string;
    getSpriteByKey: (key: string) => string;
    loadSprite: (map: [number, number, number, number], key?: string) => void;
  }
);

// TODO: Seemingly still running multiple times for existing/loading assets
const SpriteController = ({ children }: { children: React.ReactNode }) => {
  const [Sprites, setSprites] = useState({} as { [key: string]: string });

  const loadSprite = (map: [number, number, number, number], key?: string) => {
    const k = key ? key : `${map[0]}:${map[1]}:${map[2]}:${map[3]}`;
    if (Sprites[k]) return;
    setSprites((sprites) => {
      sprites[k] = 'loading';
      return { ...sprites };
    });
    getSprites(spriteSheet, [map]).then((result) => {
      if (result.length)
        setSprites((sprites) => {
          sprites[k] = result[0];
          console.log('New Sprite added to controller:', sprites);
          return { ...sprites };
        });
    });
  };

  const getSpriteByMap = (map: [number, number, number, number]) => {
    const sprite = Sprites[`${map[0]}:${map[1]}:${map[2]}:${map[3]}`];
    return sprite ? sprite : '';
  };

  const getSpriteByKey = (key: string) => {
    const sprite = Sprites[key];
    return sprite ? sprite : '';
  };

  return (
    <SpriteControllerContext.Provider
      value={{ getSpriteByKey, getSpriteByMap, loadSprite }}
    >
      <canvas
        id="canvas"
        width="128px"
        height="128px"
        style={{ position: 'absolute' }}
      ></canvas>
      {children}
    </SpriteControllerContext.Provider>
  );
};

export default SpriteController;