import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
    ChevronDownIcon,
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ThemeSelector() {
    const [selectedTheme, setSelectedTheme] = useState(() => {
        return localStorage.getItem('selectedTheme') || 'default';
    });

    const applyTheme = (theme: string) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'customDark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'customLight');
        } else {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDarkMode) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'customDark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'customLight');
            }
        }
    };

    useEffect(() => {
        applyTheme(selectedTheme);
    }, [selectedTheme]);

    const handleThemeChange = (theme: string) => {
        setSelectedTheme(theme);
        applyTheme(theme);
        localStorage.setItem('selectedTheme', theme);
    };

    return (
        <Menu as="div" className="relative inline-block text-left mx-4">
            <div>
                <Menu.Button className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-gray-50 dark:bg-base-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-100 cursor-pointer">
                    {selectedTheme === "dark" ? (
                        <MoonIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    ) : selectedTheme === "light" ? (
                        <SunIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    ) : (
                        <ComputerDesktopIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    )}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-50 dark:bg-base-100 darkshadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 rounded-lg">
                        <Menu.Item>
                            {({ active }) => (
                                <label
                                    className={classNames(
                                        "block px-4 py-2 text-sm cursor-pointer",
                                        active
                                            ? "bg-base-100 dark:text-gray-200 text-gray-900"
                                            : "dark:text-gray-200text-gray-900"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        id="defaultTheme"
                                        name="theme"
                                        value="default"
                                        checked={selectedTheme === "default"}
                                        onChange={() =>
                                            handleThemeChange("default")
                                        }
                                        className="sr-only"
                                    />
                                    Défaut
                                </label>
                            )}
                        </Menu.Item>
                        {/* Light Theme Option */}
                        <Menu.Item>
                            {({ active }) => (
                                <label
                                    className={classNames(
                                        "block px-4 py-2 text-sm cursor-pointer",
                                        active
                                            ? "bg-base-100 dark:text-gray-200 text-gray-900"
                                            : "dark:text-gray-200 text-gray-900"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        id="lightTheme"
                                        name="theme"
                                        value="light"
                                        checked={selectedTheme === "light"}
                                        onChange={() =>
                                            handleThemeChange("light")
                                        }
                                        className="sr-only"
                                    />
                                    Clair
                                </label>
                            )}
                        </Menu.Item>
                        {/* Dark Theme Option */}
                        <Menu.Item>
                            {({ active }) => (
                                <label
                                    className={classNames(
                                        "block px-4 py-2 text-sm cursor-pointer",
                                        active
                                            ? "bg-base-100 dark:text-gray-200 text-gray-900"
                                            : "dark:text-gray-200 text-gray-900"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        id="darkTheme"
                                        name="theme"
                                        value="dark"
                                        checked={selectedTheme === "dark"}
                                        onChange={() =>
                                            handleThemeChange("dark")
                                        }
                                        className="sr-only"
                                    />
                                    Sombre
                                </label>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
