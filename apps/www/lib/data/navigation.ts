import api from "./api";

interface Item {
  id: number;
  path: string;
  title: string;
}

interface ExternalItem extends Item {
  items: null;
  related: null;
  external: true;
}

interface RelatedItem extends Item {
  items: never[];
  related: {
    name: string;
    href: string;
  };
  external: false;
}

interface MenuItem extends Item {
  items: NavigationItem[];
  related: null;
  external: false;
}

export type NavigationItem = ExternalItem | RelatedItem | MenuItem;

export async function getNavigation(name: string, locale: string) {
  return api.get<NavigationItem[]>(`/navigation/${name}?locale=${locale}&type=TREE`);
}
