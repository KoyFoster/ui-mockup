type SpriteMap = [number, number, number, number];

interface MenuNode {
  [key: string]: any;

  options?: string[];
  id: string;
  parent?: string;
  label?: string;
  loaded?: boolean;
  map?: SpriteMap;
  sprite?: string;
  action?: () => void;
  [key: string]: MenuNode;
}