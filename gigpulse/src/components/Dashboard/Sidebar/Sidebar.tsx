import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Cog6ToothIcon,
  ChartPieIcon,
  FolderIcon,
  XMarkIcon,
  UserCircleIcon,
  HeartIcon,
  UsersIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { closeSidebar, openSidebar } from "../../../store/reducers/sidebar";
// import { closeNavbar } from "../../../store/reducers/navbar";
import { useAppSelector } from "../../../hooks/redux";

interface NavigationItemsInterface {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  current: boolean;
}

const userNavigation = [
  {
    name: "Profil",
    to: "/parametres/compte",
    icon: UserCircleIcon,
    current: false,
  },
  {
    name: "Statistiques",
    to: "/parametres/statistiques",
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "Mes services",
    to: "/parametres/services",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Mes favoris",
    to: "/parametres/favoris",
    icon: HeartIcon,
    current: false,
  },
];

const adminNavigation = [
  {
    name: "Utilisateurs",
    to: "/parametres/utilisateurs",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Services",
    to: "/parametres/liste-services/page/1",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Catégories",
    to: "/parametres/categories",
    icon: Squares2X2Icon,
    current: false,
  },
  {
    name: "Etiquettes",
    to: "/parametres/etiquettes",
    icon: TagIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const sidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const userName = useAppSelector((state) => state.user.currentUser.name);
  const userRole = useAppSelector((state) => state.user.currentUser.role);
  let navigationItems: NavigationItemsInterface[] = [];

  if (userRole === "User") {
    navigationItems = userNavigation;
  } else if (userRole === "Super admin") {
    navigationItems = [...userNavigation, ...adminNavigation];
  } else if (userRole === "Admin") {
    navigationItems = [
      ...userNavigation,
      ...adminNavigation.filter((item) => item.name !== "Utilisateurs"),
    ];
  }

  const handleIconClick = () => {
    if (sidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative lg:hidden z-50"
          onClose={() => dispatch(closeSidebar())}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full bottom-0 flex w-16 justify-center pb-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => dispatch(closeSidebar())}
                    >
                      <span className="sr-only">fermer la barre latérale</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-base-200 px-6 pb-2 pt-32">
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <div className="text-xs font-semibold leading-6 text-gray-950 dark:text-gray-200">
                            Bonjour {userName}
                          </div>
                          {navigationItems.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.to}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-success"
                                    : "text-gray-700 dark:text-gray-200 hover:text-success hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                                onClick={() => dispatch(closeSidebar())}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-success"
                                      : "text-gray-400 dark:text-gray-400 group-hover:text-success",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 z-10 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col bg-base-200 gap-y-5 overflow-y-auto border-r border-base-200 px-6 pt-32">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-950 dark:text-gray-50">
                  Mes informations
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-cyan-600"
                            : "text-gray-700 dark:text-gray-200 hover:text-cyan-600 hover:bg-base-200",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-cyan-800"
                              : "text-gray-400 group-hover:text-cyan-800",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 z-[200] flex items-center m-2 hover:bg-success transition lg:hidden rounded-full">
        <Transition
          as={Fragment}
          show={!sidebarOpen}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed bottom-0 right-0 z-50 flex items-center bg-success dark:bg-accent p-3 m-2 hover:bg-success lg:hidden shadow-inner rounded-full">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white lg:hidden"
              onClick={handleIconClick}
            >
              <span className="sr-only">ouvrir la barre latérale</span>
              <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </Transition>
      </div>
    </div>
  );
}
