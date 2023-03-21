import { useContext } from 'react';
import { SoundControllerContext } from '../../assets/sounds';
import './index.scss';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src?: string;
  alt?: string;
  tooltip?:string;
  onToolTip?: (tooltip: string) => void;
}

const ActionButton = ({
  id,
  src,
  alt,
  onClick,
  onMouseOver,
  onFocus,
  onMouseLeave,
  tooltip,
  onToolTip,
  ...rest
}: ActionButtonProps) => {
  const sounds = useContext(SoundControllerContext);
  const tp = tooltip || id || '';

  return (
    <button
      type="button"
      className="action-button"
      draggable="false"
      data-tool-tip={`${id}`}
      onClick={(e) => {
        if(onClick) onClick(e);
        sounds.menuPositive.Play();
      }}
      onMouseOver={(e) => {
        if(onMouseOver) onMouseOver(e);
        if(onToolTip) onToolTip(tp);
        sounds.menuMove.Play();        
      }}
      onMouseLeave={(e) => {
        if(onMouseLeave) onMouseLeave(e);
        if(onToolTip) onToolTip('');
      }}
      onFocus={(e) => {
        if(onFocus) onFocus(e);
        if(onToolTip) onToolTip(tp);
        sounds.menuMove.Play();        
      }}
      {...rest}
    >
      {!src || <img src={src} alt={alt} draggable="false" />}
    </button>
  );
};

export default ActionButton;