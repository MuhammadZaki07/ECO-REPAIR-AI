export interface SubMenuItem {
  title: string;
  href: string;
  description: string;
}

export interface MenuItem {
  title: string;
  href?: string;
  subItems?: SubMenuItem[];
}

export type MenuItemSidebar = {
  label: string;
  icon: string;
  path: string;
  badge?: string;
  children?: MenuItemSidebar[];
};
