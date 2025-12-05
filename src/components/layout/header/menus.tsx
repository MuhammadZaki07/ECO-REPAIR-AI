import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/layout/header/navigation-menu";
import { cn } from "@/lib/utils";
import menuItems from "@/data/MenuItemsNavbar.json";
import type { MenuItem } from "@/types/menu";
import { useTranslation } from "react-i18next";

export function Menus() {
  const menus: MenuItem[] = menuItems;
  const { t } = useTranslation();
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\//g, " ")
      .replace(/\s+/g, "_")
      .replace(/[^\w_]/g, "");

  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        {menus.map((item) => {
          const key = slugify(item.title);

          return item.subItems ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger className="bg-transparent text-xs">
                {t(`menu.${key}.title`)}
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-2">
                <ul className="grid gap-3 md:grid-cols-3 max-w-xl lg:w-3xl">
                  {item.subItems.map((sub) => {
                    const subKey = slugify(sub.title);
                    return (
                      <ListItem
                        key={sub.title}
                        title={t(`menu.${subKey}.title`)}
                        href={sub.href}
                      >
                        {t(`menu.${subKey}.description`)}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[15px] font-semibold"
                )}
              >
                <a href={item.href}>{t(`menu.${key}.title`)}</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a className="p-3" title={title} href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
