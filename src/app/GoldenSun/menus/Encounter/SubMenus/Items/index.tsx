import ActionMenu from 'src/app/GoldenSun/components/Menu/ActionMenu';
import ItemActionMenuItem from 'src/app/GoldenSun/components/Menu/ItemActionMenuItem';
import './index.scss';
import Antidote from 'src/app/GoldenSun/assets/sprites/icons/items/single-use/healing/Antidote.gif';
import { useContext } from 'react';
import { SpriteControllerContext } from 'src/app/GoldenSun/assets/context';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';

const Items = () => {
  const { getSpriteByKey } = useContext(SpriteControllerContext);

  return (
    <div className="battle-menu item-menu">
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <ActionButton
        src={getSpriteByKey('items')}
        disabled={true}
        style={{ filter: 'brightness(100%)' }}
      />
    </div>
      <ActionMenu>
        <ItemActionMenuItem
          icon={Antidote}
          id={'antidote'}
          label={'Antidote'}
          tooltip="Attack with a giant sword."
        />
      </ActionMenu>
    </div>
  );
};

export default Items;
