"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UserAvailableBadgeComp from "./UserAvailableBadgeComp";
const routes = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "WorkFlows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];
const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) =>
      route.href === "" ? pathname === "/" : pathname === `/${route.href}`,
    ) || routes[0];
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] p-4">
        <Logo />
      </div>
      <div className="p-2">
        <UserAvailableBadgeComp />
      </div>
      <div className="flex flex-col p-2 ">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sideBarActivateVariant"
                  : "sideBarItem",
            })}
          >
            {" "}
            <route.icon size={20} />
            {route.label}{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) =>
      route.href === "" ? pathname === "/" : pathname === `/${route.href}`,
    ) || routes[0];
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex-center">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button
              onClick={() => setOpen((prev) => !prev)}
              variant="ghost"
              size={"icon"}
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px]  sm:w-[540px] space-y-4 p-6 "
            side="left"
          >
            <Logo />
            <UserAvailableBadgeComp />

            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  onClick={(prev) => setOpen(!prev)}
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sideBarActivateVariant"
                        : "sideBarItem",
                  })}
                >
                  {" "}
                  <route.icon size={20} />
                  {route.label}{" "}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
