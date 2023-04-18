import { useContext } from 'react';
import { SpriteControllerContext } from 'src/app/GoldenSun/assets/context';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';
import ActionMenu from 'src/app/GoldenSun/components/Menu/ActionMenu';
import DjinnActionMenuItem from 'src/app/GoldenSun/components/Menu/DjinnActionMenuItem';
import './index.scss';

const Djinn = () => {
  const { getSpriteByKey } = useContext(SpriteControllerContext);

  return (
    <div className="battle-menu djinn-menu">
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <ActionButton
          src={getSpriteByKey('djinn')}
          disabled={true}
          style={{ filter: 'brightness(100%)' }}
        />
      </div>
      <div className="menu-frame stat-change" />
      <ActionMenu>
        <DjinnActionMenuItem
          id={'solo'}
          label={'Solo'}
          element="venus"
          tooltip="Attack with a giant sword."
        />
        <DjinnActionMenuItem
          id={'solo'}
          label={'Solo'}
          element="venus"
          tooltip="Attack with a giant sword."
        />
        <DjinnActionMenuItem
          id={'solo'}
          label={'Solo'}
          element="venus"
          tooltip="Attack with a giant sword."
        />
        <DjinnActionMenuItem
          id={'solo'}
          label={'Solo'}
          element="venus"
          tooltip="Attack with a giant sword."
        />
      </ActionMenu>
    </div>
  );
};

export default Djinn;
