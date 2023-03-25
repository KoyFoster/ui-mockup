import ActionMenu from 'src/app/GoldenSun/components/Menu/ActionMenu';
import ItemActionMenuItem from 'src/app/GoldenSun/components/Menu/ItemActionMenuItem';
import './index.scss';
import Antidote from 'src/app/GoldenSun/assets/sprites/icons/items/single-use/healing/Antidote.gif';

const Items = () => {
  return (
    <div className="battle-menu item-menu">
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
