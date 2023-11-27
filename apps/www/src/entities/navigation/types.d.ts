export type NavigationItem = NavigationMenu | NavigationRelatedLink | NavigationExternalLink;

export declare interface NavigationMenu {
  id: number;
  path: string;
  title: string;
  items: NavigationItem[];
  related: null;
  external: false;
}

export declare interface NavigationRelatedLink {
  id: number;
  path: string;
  title: string;
  items: never[];
  related: {
    name: string;
    href: string;
  };
  external: false;
}

export declare interface NavigationExternalLink {
  id: number;
  path: string;
  title: string;
  related: null;
  external: true;
}
