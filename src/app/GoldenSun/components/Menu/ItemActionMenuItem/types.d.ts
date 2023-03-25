interface ItemActionMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  element?: EnergyElement;
  alt?: string;
  tooltip?: string;
  label?: string;
  onToolTip?: (tooltip: string) => void;
}
