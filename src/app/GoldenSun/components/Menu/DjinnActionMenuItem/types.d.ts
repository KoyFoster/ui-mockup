type EnergyElement = 'jupiter' | 'mars' | 'mercury' | 'venus';

interface DjinnActionMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  element?: EnergyElement;
  alt?: string;
  tooltip?: string;
  label?: string;
  onToolTip?: (tooltip: string) => void;
}
