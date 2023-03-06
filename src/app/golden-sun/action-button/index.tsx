import './index.scss';

interface GSActionButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src?: string;
  alt?: string;
}

const ActionButton = ({
  id,
  src,
  alt,
  onClick,
  ...rest
}: GSActionButton) => {
  return (
    <button
      type="button"
      className="menu-actions"
      onClick={onClick}
      draggable="false"
      data-tool-tip={`${id}`}
      {...rest}
    >
      {!src || <img src={src} alt={alt} draggable="false" />}
    </button>
  );
};

export default ActionButton;