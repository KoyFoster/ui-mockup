import { useContext } from 'react';
import { SoundControllerContext } from '../../assets/sounds';
import './index.scss';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src?: string;
  alt?: string;
  tooltip?:string;
  negative?: boolean;
  onToolTip?: (tooltip: string) => void;
}

// TODO (2023-03-2023): Figure how to not play the focus soudn effect and click sound effect at the same time
const ActionButton = ({
  className,
  id,
  src,
  alt,
  negative,
  onClick,
  onMouseOver,
  onFocus,
  onMouseLeave,
  tooltip,
  onToolTip,
  disabled,
  ...rest
}: ActionButtonProps) => {
  const sounds = useContext(SoundControllerContext);
  const tp = tooltip || id || '';

  function playSound()
  {
    if(negative)
    sounds.menuNegative.Play();
    else
    sounds.menuPositive.Play();
  }

  return (
    <button
      type="button"
      className={"action-button bounce flash" + (className ? ` ${className}`: '')}
      draggable="false"
      data-tool-tip={`${id}`}
      disabled={disabled}
      onClick={(e) => {
        if(disabled) return;
        if(onClick) onClick(e);
        playSound();
      }}
      onMouseOver={(e) => {
        if(disabled) return;
        if(onMouseOver) onMouseOver(e);
        if(onToolTip) onToolTip(tp);
        sounds.menuPositive.Play();
      }}
      onMouseLeave={(e) => {
        if(disabled) return;
        if(onMouseLeave) onMouseLeave(e);
        if(onToolTip) onToolTip('');
      }}
      onFocus={(e) => {
        if(disabled) return;
        if(onFocus) onFocus(e);
        if(onToolTip) onToolTip(tp);
        sounds.menuPositive.Play();
      }}
      {...rest}
    >
      {!src || <img src={src} alt={alt} draggable="false" />}
    </button>
  );
};

export default ActionButton;