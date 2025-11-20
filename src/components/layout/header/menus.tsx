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
import menuItems from "@/data/ListMenuItems.json";
import type { MenuItem } from "@/types/menu";

export function Menus() {
  const menus: MenuItem[] = menuItems;
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        {menus.map((item) =>
          item.subItems ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger className="bg-transparent text-xs">{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent className="p-2">
                <ul className="grid gap-3 md:grid-cols-3 max-w-xl lg:w-3xl">
                  {item.subItems.map((sub) => (
                    <ListItem key={sub.title} title={sub.title} href={sub.href}>
                      {sub.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent text-xs")}>
                <a href={item.href}>{item.title}</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ListItem Component
function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a className="p-3" href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
