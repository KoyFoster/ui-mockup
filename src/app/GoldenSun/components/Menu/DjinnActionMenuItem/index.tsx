import jupiter from 'src/app/GoldenSun/assets/sprites/icons/misc/Jupiter_Star.gif';
import mars from 'src/app/GoldenSun/assets/sprites/icons/misc/Mars_Star.gif';
import mercury from 'src/app/GoldenSun/assets/sprites/icons/misc/Mercury_Star.gif';
import venus from 'src/app/GoldenSun/assets/sprites/icons/misc/Venus_Star.gif';
import ActionMenuItem from '../ActionMenuItem';
import './index.scss';

export const getElement = (element?: EnergyElement) => {
  console.log({element});
  if (element === 'venus') return venus;
  if (element === 'mars') return mars;
  if (element === 'mercury') return mercury;
  if (element === 'jupiter') return jupiter;
}

const DjinnActionMenuItem = ({
  element,
  ...rest
}: DjinnActionMenuItemProps) => {
  return <ActionMenuItem {...rest} element={getElement(element)} />;
};

export default DjinnActionMenuItem;
