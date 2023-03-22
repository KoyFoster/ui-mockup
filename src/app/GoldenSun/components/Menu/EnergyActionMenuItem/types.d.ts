type EnergyElement =  'venus' | 'mars' | 'mercury' | 'jupiter';

interface EnergyActionMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  element?: EnergyElement;
  range?: string;
  alt?: string;
  tooltip?: string;
  label?: string;
  onToolTip?: (tooltip: string) => void;
}
