"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Income,
  Expenses,
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  UserCircleIcon,
} from "@/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsHovered } from "@/redux/slices/ui/sideBarSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useSession } from "@/context/SessionContext";

interface SubItem {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  requiredPermission?: string;
}

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
  requiredPermission?: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      {
        name: "Create Companies",
        path: "/dashboard/create-company",
        requiredPermission: "global:manage_companies",
        pro: false,
      },
      {
        name: "Existing Companies",
        path: "/dashboard/companies",
      },
    ],
  },
  // Sales Dashboard
  // Admin: will only view quotation part
  {
    icon: <Income />,
    name: "Sales",
    requiredPermission: "menu:view_sales",
    subItems: [
      {
        name: "Cash Sale",
        path: "/",
        requiredPermission: "sale:create_case_sale",
      },
      { name: "Sale Invoice", path: "/", pro: true, new: true },
      { name: "Receipt", path: "/", pro: true, new: true },
      { name: "Delivery Order", path: "/", pro: true, new: true },
      { name: "Quotation", path: "/", pro: true, new: true },
      { name: "Proforma Invoice", path: "/", pro: true, new: true },
      { name: "Customer", path: "/", pro: true, new: true },
      { name: "Credit Note", path: "/", pro: true, new: true },
    ],
  },
  // superadmin have all the access
  // Finance have all the access
  {
    icon: <Expenses />,
    name: "Expenses",
    subItems: [
      { name: "New Expenses", path: "/", pro: false },
      { name: "Purchase Invoice", path: "/", pro: true, new: true },
      { name: "Payment Voucher", path: "/", pro: true, new: true },
      { name: "Goods Received", path: "/", pro: true, new: true },
      { name: "Purchase Order", path: "/", pro: true, new: true },
      { name: "Supplier", path: "/", pro: true, new: true },
      { name: "Debit Note", path: "/", pro: true, new: true },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/", pro: false },
      { name: "Bar Chart", path: "/", pro: false },
    ],
  },
];

const AppSidebar = () => {
  const session = useSession();
  const isSuperAdmin = session.user.isSuperAdmin || false;
  const dispatch = useAppDispatch();
  const { isExpanded, isMobileOpen, isHovered } = useAppSelector(
    (state) => state.sidebar
  );
  const pathname = usePathname();

  console.log(session);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>({ type: "main", index: 0 }); // Temprary, tukar null

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = true; // Temporary, tukar false
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeight) => ({
          ...prevHeight,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const [userData, setUserData] = useState(null);

  console.log("From app-sidebar", userData);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/companies/lists");
      console.log(res.body);
    };
    fetchCompanies();
  }, []);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      )
        return null;

      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && dispatch(setIsHovered(true))}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/aksara.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/aksara.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/aksara.svg"
              alt="Logo"
              width={60}
              height={60}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase leading-5 text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* Temporary, Sini ada SidebarWidget */}
        {isExpanded || isHovered || isMobileOpen ? "" : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
