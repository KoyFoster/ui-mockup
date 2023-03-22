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