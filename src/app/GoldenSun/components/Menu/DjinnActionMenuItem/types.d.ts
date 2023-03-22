type EnergyElement =  'venus' | 'mars' | 'mercury' | 'jupiter';

interface DjinnActionMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  element?: EnergyElement;
  alt?: string;
  tooltip?: string;
  label?: string;
  onToolTip?: (tooltip: string) => void;
}
