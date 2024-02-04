import { Fragment, createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import actionLogoutUser from "../../store/asyncActions/logoutUser";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    ArrowRightStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
    // BellIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
} from "@heroicons/react/20/solid";
import * as Icon from "@heroicons/react/24/outline";
import logoDesktop from "../../assets/logo-gigpulse.svg";
import logoMobile from "../../assets/logo-gigpulse-v2.svg";
import Searchbar from "../Searchbar/Searchbar";
import { Category } from "../../@types/category";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar({ categories } : {categories: Category[]}) {
    const dispatch = useAppDispatch();

    const isLogged = useAppSelector((state) => state.user.logged);
    const location = useLocation();
    const isCategoryActive = location.pathname.startsWith("/categorie");
    const userAvatar = useAppSelector(
        (state) => state.user.currentUser.profilePicture
    );
    const userName = useAppSelector((state) => state.user.currentUser.name);
    const userEmail = useAppSelector((state) => state.user.currentUser.email);

    return (
        <Disclosure
            as="nav"
            className="bg-white dark:bg-base-300 shadow py-3 relative z-50"
        >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex px-2 lg:px-0 items-center">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                    <img
                                        className="block h-10 w-auto lg:hidden"
                                        src={logoMobile}
                                        alt="logo gigpulse"
                                    />
                                    <img
                                        className="hidden h-12 w-auto lg:block"
                                        src={logoDesktop}
                                        alt="logo gigpulse"
                                    />
                                    </Link>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    <Link
                                        to="/"
                                        className={classNames(
                                            location.pathname === "/"
                                                ? "border-success text-gray-900"
                                                : "border-transparent text-gray-500",
                                            "inline-flex items-center border-b-2  px-1 pt-1 text-sm font-bold uppercase text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        )}
                                    >
                                        Accueil
                                    </Link>
                                    <Popover className="relative">
                                        <Popover.Button className="inline-flex items-center px-1 pt-1 text-sm font-bold text-gray-900 dark:text-gray-400 hover:text-gray-700">
                                            <span
                                                className={classNames(
                                                    isCategoryActive
                                                        ? "border-success text-gray-900 dark:text-gray-200"
                                                        : "border-transparent text-gray-900 dark:text-gray-200",
                                                    "uppercase hover:text-gray-700 border-b-2"
                                                )}
                                            >
                                                Catégories
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-md px-4 sm:px-0">
                                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="relative grid gap-6 bg-white dark:bg-base-100 px-5 py-6 sm:gap-8 sm:p-8">
                                                        {categories && categories.map(
                                                            (category) => (
                                                                <Link
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    to={`categorie/${category.name}/${category.id}/page/1`}
                                                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-primary"
                                                                >
                                                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-success dark:bg-accent sm:h-12 sm:w-12">
                                                                    {category.react_icon && category.react_icon in Icon ? createElement(Icon[category.react_icon as 'Bars3Icon'|'XMarkIcon'|'UserCircleIcon'|'ArrowRightStartOnRectangleIcon'|'ArrowRightEndOnRectangleIcon'|'BellIcon'],
                                                                            {
                                                                                className: "h-6 w-6 text-white group-hover:text-success",
                                                                                "aria-hidden": "true",
                                                                            }
                                                                        ) :
                                                                        createElement(Icon.StopIcon,
                                                                            {
                                                                                className: "h-6 w-6 text-white group-hover:text-success",
                                                                                "aria-hidden": "true",
                                                                            }
                                                                        )
                                                                    }
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <p className="text-base font-medium text-gray-900 dark:text-gray-400">
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </p>
                                                                        <p className="mt-1 text-sm text-gray-500">
                                                                            {
                                                                                category.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                    <Link
                                        to="/a-propos"
                                        className={classNames(
                                            location.pathname === "/a-propos"
                                                ? "border-success text-gray-900"
                                                : "border-transparent text-gray-500",
                                            "inline-flex items-center border-b-2  px-1 pt-1 text-sm font-bold uppercase text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        )}
                                    >
                                        A propos
                                    </Link>
                                    <Link
                                        to="/faq"
                                        className={classNames(
                                            location.pathname === "/faq"
                                                ? "border-success text-gray-900"
                                                : "border-transparent text-gray-500",
                                            "inline-flex items-center border-b-2  px-1 pt-1 text-sm font-bold uppercase text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        )}
                                    >
                                        Faq
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className={classNames(
                                            location.pathname === "/contact"
                                                ? "border-success text-gray-900"
                                                : "border-transparent text-gray-500",
                                            "inline-flex items-center border-b-2  px-1 pt-1 text-sm font-bold uppercase text-gray-900 dark:text-gray-200 hover:text-gray-700"
                                        )}
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                            <Searchbar />
                            <ThemeSelector />
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-success dark:focus:bg-primary dark:hover:bg-accent">
                                    <span className="sr-only">
                                        Ouvrir le menu principal
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            {isLogged ? (
                                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                    {/* <button
                                        type="button"
                                        className="flex-shrink-0 rounded-full bg-white dark:bg-primary p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
                                    >
                                        <span className="sr-only">
                                            Voir les notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button> */}

                                    {/* Profile dropdown */}
                                    <Menu
                                        as="div"
                                        className="relative ml-4 flex-shrink-0"
                                    >
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white dark:bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2">
                                                <span className="sr-only">
                                                    Ouvrir le menu utilisateur
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={userAvatar}
                                                    alt="Photo de profil de l'utilisateur"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/parametres"
                                                            className={classNames(
                                                                active
                                                                    ? "dark:bg-accent bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-md"
                                                            )}
                                                        >
                                                            Mon profil
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <div className="flex justify-center dark:hover:bg-accent hover:bg-gray-100 0 py-2">
                                                        <button
                                                            className="flex items-center justify-center font-medium text-error space-x-2"
                                                            onClick={() => {
                                                                dispatch(
                                                                    actionLogoutUser()
                                                                );
                                                            }}
                                                        >
                                                            <span>
                                                                Se déconnecter
                                                            </span>
                                                            <ArrowRightStartOnRectangleIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            ) : (
                                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                    {/* Profile dropdown */}
                                    <Menu
                                        as="div"
                                        className="relative ml-4 flex-shrink-0"
                                    >
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white dark:bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2">
                                                <span className="sr-only">
                                                    Ouvrir le menu utilisateur
                                                </span>
                                                <UserCircleIcon
                                                    className="h-10 w-10 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-primary dark:text-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/connexion"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "flex items-center justify-center dark:hover:bg-accent px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-center space-x-2 text-cyan-600 font-bold">
                                                                <span>
                                                                    Se connecter
                                                                </span>
                                                                <ArrowRightEndOnRectangleIcon
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <Disclosure.Button
                                as={Link}
                                to="/"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium uppercase text-gray-600  dark:text-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Accueil
                            </Disclosure.Button>
                            <Disclosure as="div">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full rounded-lg bg-white dark:bg-base-300 px-4 py-2 text-left font-medium uppercase text-gray-600 dark:text-gray-200  hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>Catégories</span>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    open ? "rotate-180" : "",
                                                    "h-5 w-5 flex-none"
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            {categories && categories.map((category) => (
                                                <Disclosure.Button
                                                    key={category.id}
                                                    as={Link}
                                                    to={`categorie/${category.name}/${category.id}/page/1`}
                                                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-200  hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                                                >
                                                    {category.name}
                                                </Disclosure.Button>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure.Button
                                as={Link}
                                to="/a-propos"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium uppercase text-gray-600 dark:text-gray-200  hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                A propos
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                to="/faq"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium uppercase text-gray-600 dark:text-gray-200  hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Faq
                            </Disclosure.Button>
                            <Disclosure.Button
                                as={Link}
                                to="/contact"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium uppercase text-gray-600 dark:text-gray-200  hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Contact
                            </Disclosure.Button>
                        </div>

                        <div>
                            {isLogged ? (
                                <div className="border-t border-gray-200 pb-3 pt-4 space-y-4">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={userAvatar}
                                                alt="Photo de profil de l'utilisateur"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800 dark:text-gray-200 ">
                                                {userName}
                                            </div>
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 ">
                                                {userEmail}
                                            </div>
                                        </div>
                                        {/* <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full bg-white dark:bg-primary p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
                                        >
                                            <span className="sr-only">
                                                Voir les notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button> */}
                                    </div>
                                    <Disclosure.Button
                                        as={Link}
                                        to="/parametres"
                                        className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-secondary hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Accéder à mon profil &rarr;
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="button"
                                        onClick={() => {
                                            dispatch(actionLogoutUser());
                                        }}
                                        className="block px-4 py-2 mt-8 text-base font-medium text-gray-500 dark:hover:bg-primary hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        <div className="flex items-center space-x-2 text-error">
                                            Se déconnecter
                                            <ArrowRightStartOnRectangleIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </Disclosure.Button>
                                </div>
                            ) : (
                                <div className="mt-3 space-y-1">
                                    <Disclosure.Button
                                        as={Link}
                                        to="/connexion"
                                        className="flex px-4 py-2 text-base font-medium dark:bg-primary text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        <div className="flex items-center space-x-2 text-cyan-600">
                                            <span>Se connecter</span>
                                            <ArrowRightEndOnRectangleIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </Disclosure.Button>
                                </div>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}