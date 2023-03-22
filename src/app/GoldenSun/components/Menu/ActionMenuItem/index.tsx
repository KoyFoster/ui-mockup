import { useContext } from 'react';
import { SoundControllerContext } from 'src/app/GoldenSun/assets/sounds';
import { BattleStateContext } from 'src/app/GoldenSun/menus/Encounter/Context/BattleState';
import './index.scss';

const ActionMenuItem = ({
  id,
  label,
  icon,
  element,
  range,
  onClick,
  onMouseOver,
  onFocus,
  onMouseLeave,
  tooltip,
  onToolTip,
  ...rest
}: ActionMenuItemProps) => {
  const { setToolTip } = useContext(BattleStateContext);
  const sounds = useContext(SoundControllerContext);
  const tp = tooltip || id || null;

  return (
    <li
      className="action-menu-item"
      id={id}
      onMouseOver={(e) => {
        sounds.menuMove.Play();
      }}
    >
      <button
        onFocus={(e) => {
          if(tp !== null) setToolTip(tp);

          sounds.menuMove.Play();
          if(onFocus) onFocus(e);
        }}
        onMouseOver={(e) => {
          if(tp !== null) setToolTip(tp);

          if(onMouseOver) onMouseOver(e);
        }}
      >
        {!icon || <img src={icon} alt="Ragnorak" />}
        {label}
      </button>
      <div>EP</div>{' '}
      {!element || (
        <div>
          7<img src={element} alt="Earth Energy" />
        </div>
      )}
      {!range || <img src={range} alt="aoe-scale" />}
    </li>
  );
};

export default ActionMenuItem;
