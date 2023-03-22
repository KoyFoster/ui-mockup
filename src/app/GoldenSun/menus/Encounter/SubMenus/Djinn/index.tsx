import ActionMenu from 'src/app/GoldenSun/components/Menu/ActionMenu';
import DjinnActionMenuItem from 'src/app/GoldenSun/components/Menu/DjinnActionMenuItem';
import './index.scss';

const Djinn = () => {
  const stats = 'asdasdas';
  return (
    <div className="battle-menu djinn-menu">
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
