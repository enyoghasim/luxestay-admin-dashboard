"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "../../common/lib/utils";
import LogoFull from "@/modules/common/icons/logo-full-dark";
import {
  LuBadgeDollarSign,
  LuBedSingle,
  LuBookOpen,
  LuBookOpenCheck,
  LuCog,
  LuLayoutDashboard,
  LuList,
  LuPlaneTakeoff,
  LuTicketsPlane,
  LuTrendingUpDown,
  LuX,
} from "react-icons/lu";
import { IconType } from "react-icons";
import { useSidebarStore } from "../store/sidebarStore";
import { Button } from "@/modules/common/components/ui/button";

type NavItem = {
  href: string;
  title: string;
  Icon: IconType;
};

const NavItems: NavItem[] = [
  {
    href: "/",
    title: "Dashboard",
    Icon: LuLayoutDashboard,
  },
  {
    href: "/flights-bookings",
    title: "Flights & Jets Bookings",
    Icon: LuTicketsPlane,
  },
  {
    href: "/property-bookings",
    title: "Properties Bookings",
    Icon: LuBedSingle,
  },
  {
    href: "/listings",
    title: "Listings",
    Icon: LuList,
  },
  {
    href: "/jets",
    title: "Jets",
    Icon: LuPlaneTakeoff,
  },
  {
    href: "/transactions",
    title: "Transactions",
    Icon: LuBadgeDollarSign,
  },
  {
    href: "/deligence-requests",
    title: "Deligence Requests",
    Icon: LuBookOpen,
  },
  {
    href: "/deligence",
    title: "Deligence",
    Icon: LuBookOpenCheck,
  },
  {
    href: "/exchange-rates",
    title: "Exchange Rates",
    Icon: LuTrendingUpDown,
  },
  {
    href: "/settings",
    title: "Settings",
    Icon: LuCog,
  },
];

const Aside = () => {
  const pathname = usePathname();

  const isActive = (url: string): boolean => {
    return pathname === url;
  };

  const { isOpen, closeSidebar } = useSidebarStore();

  const closeSidebarHandler = () => {
    if (!isOpen) return;
    closeSidebar();
  };
  return (
    <>
      <aside
        className={cn(
          "fixed z-10 transition-transform duration-150 bg-white md:flex flex-col gap-5 left-0 top-0 bottom-0 w-72 border-r border-neutral-200",
          {
            "translate-x-0": isOpen,
            "md:translate-x-0 -translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex-1">
          <div className="p-5 flex flex-row items-center gap-2 justify-start border-b border-neutral-200">
            <Button
              onClick={closeSidebar}
              className="md:hidden block"
              variant="outline"
            >
              <LuX className=" w-5! h-5! shrink-0" />
            </Button>
            <LogoFull className="w-[100px] h-5 md:mx-auto" />
          </div>
          <div className="flex-1 pt-10 flex flex-col gap-5 overflow-y-auto">
            <nav>
              <ul className="space-y-3 font-medium ">
                {NavItems.map((NavItem) => (
                  <li
                    key={NavItem.href}
                    className={cn(
                      "w-full flex flex-row items-center before:w-1 before:h-5 before:bg-transparent before:transition-all before:duration-200 before:rounded-tr-full before:rounded-br-full before:absolute before:left-0 before:contents-[' '] bg-transparent px-4 rounded",
                      {
                        "before:bg-primary": isActive(NavItem.href),
                      }
                    )}
                  >
                    <Link
                      onClick={closeSidebarHandler}
                      href={NavItem.href}
                      className={cn(
                        "w-full flex flex-row items-center gap-2 relative bg-transparent px-4 py-2 rounded",
                        {
                          "bg-neutral-100": isActive(NavItem.href),
                        }
                      )}
                    >
                      <NavItem.Icon
                        size={20}
                        className={cn(
                          isActive(NavItem.href)
                            ? "text-neutral-900"
                            : "text-neutral-500"
                        )}
                      />
                      <span
                        className={cn(
                          "transition-colors text-sm duration-200",
                          isActive(NavItem.href)
                            ? "text-neutral-900"
                            : "text-neutral-500"
                        )}
                      >
                        {NavItem.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
