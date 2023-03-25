import ActionMenuItem from '../ActionMenuItem';
import './index.scss';

const ItemActionMenuItem = ({
  element,
  ...rest
}: ItemActionMenuItemProps) => {
  return <ActionMenuItem {...rest} />;
};

export default ItemActionMenuItem;
