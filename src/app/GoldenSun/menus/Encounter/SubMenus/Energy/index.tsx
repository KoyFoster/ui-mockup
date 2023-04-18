import ActionMenu from 'src/app/GoldenSun/components/Menu/ActionMenu';
import Ragnarok from 'src/app/GoldenSun/assets/sprites/icons/psynergy/Ragnarok.gif';
import Range1 from 'src/app/GoldenSun/assets/sprites/icons/psynergy/range-1.gif';
import './index.scss';
import EnergyActionMenuItem from 'src/app/GoldenSun/components/Menu/EnergyActionMenuItem';
import { useContext, useEffect } from 'react';
import { SpriteControllerContext } from 'src/app/GoldenSun/assets/context';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';

const Energy = () => {
  const { getSpriteByKey, loadSprite } = useContext(SpriteControllerContext);

  useEffect(() => {
    // Will not load if already loaded. Should already be loaded at this point
    loadSprite([36, 134, 24, 24], 'energy');
  }, [loadSprite]);

  return (
    <div className="battle-menu energy-menu">
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <ActionButton
          src={getSpriteByKey('energy')}
          disabled={true}
          style={{ filter: 'brightness(100%)' }}
        />
      </div>
      <ActionMenu>
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Ragnorak1'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
          tooltip="Attack with a giant sword."
        />
        <EnergyActionMenuItem
          id={'gaia'}
          label={'Gaia'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Something or another'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Ragnorak'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'spire'}
          label={'Spire'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'earthquake'}
          label={'Earthquake3'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'quake'}
          label={'Quake'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'heal'}
          label={'Heal'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'healing-light'}
          label={'Healing Light'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'gaia'}
          label={'Gaia'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Something or another4'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Ragnorak'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'spire'}
          label={'Spire'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'earthquake'}
          label={'Earthquake'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'quake'}
          label={'Quake'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'heal'}
          label={'Heal'}
          icon={Ragnarok}
          element="mercury"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'healing-light'}
          label={'Healing Light'}
          icon={Ragnarok}
          element="mars"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'gaia'}
          label={'Gaia'}
          icon={Ragnarok}
          element="jupiter"
          range={Range1}
        />
        <EnergyActionMenuItem
          id={'ragnorak'}
          label={'Something or another'}
          icon={Ragnarok}
          element="venus"
          range={Range1}
        />
      </ActionMenu>
    </div>
  );
};

export default Energy;
