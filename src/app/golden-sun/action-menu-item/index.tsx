import { useContext } from 'react';
import { SoundControllerContext } from '../assets/sounds';
import './index.scss';

interface ActionMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  element?: string;
  range?: string;
  alt?: string;
  tooltip?: string;
  label?: string;
  onToolTip?: (tooltip: string) => void;
}

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
  const sounds = useContext(SoundControllerContext);
  const tp = tooltip || id || '';

  return (
    <li className="action-menu-item" id={id}>
      <button>
        <img src={icon} alt="Ragnorak" />
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
