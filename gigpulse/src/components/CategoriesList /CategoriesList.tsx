import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import actionCategoryDestroy from "../../store/asyncActions/categoryDestroy";
import { toast } from "sonner";
import actionFetchCategories from "../../store/asyncActions/fetchCategories";
import { Blocks } from "react-loader-spinner";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function CategoriesList() {
    const dispatch = useAppDispatch();

    //récupère les données gig depuis le state de redux
    const categories = useAppSelector((state) => state.categories.categories);
    const isLoading = useAppSelector((state) => state.categories.isLoading);
    const categoriesReverse = [...categories].reverse();
    useEffect(() => {
        dispatch(actionFetchCategories());
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center text-2xl p-24">
                    <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                </div>
            </div>
        );
    }

    function handleClickDeleteCategory(id: number): void {
        dispatch(actionCategoryDestroy({ categoryId: id })).then((response) => {
            if (response) {
                dispatch(actionFetchCategories());
                setTimeout(() => {
                    toast.success("La catégorie a été supprimée avec succès");
                }, 1000);
            } else {
                toast.error(
                    "Une erreur s'est produite lors de la suppression de la catégorie"
                );
            }
        });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Link to="/parametres/creer-une-categorie">
                <button className="btn btn-block bg-primary lg:w-[7rem]">
                    Ajouter
                    <span className="sr-only">, Ajouter</span>
                </button>
            </Link>
            <ul
                role="list"
                className="divide-y divide-gray-100 
            dark:divide-gray-600"
            >
                {categoriesReverse.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between gap-x-6 py-5"
                    >
                        <div className="flex sm:flex-row flex-col">
                            <div className="">
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <img
                                        className="aspect-auto max-w-56 sm:max-w-80"
                                        src={`../assets/images/${category.picture}`}
                                        alt="photo du service"
                                    />
                                </div>
                            </div>
                            <div className=" sm:pl-4 align-middle">
                                <div className="flex items-start gap-x-3">
                                    <p className="divide-gray-300 font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                        {category.name}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 leading-5 text-gray-500">
                                    <p className="">
                                        description : {category.description}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="">
                                        Créé le : {category.createdAt}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="">
                                        Modifié le : {category.updatedAt}
                                    </p>
                                </div>
                                {/* <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <div className="flex flex-row">
                                        <p className="pr-2">
                                            Est actif :
                                        </p>
                                        <div>
                                            <p className="pr-2">
                                                {gig.isActive === 1 ? "OUI" : "NON"}
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                                    <span className="sr-only">
                                        Ouvrir les options
                                    </span>
                                    <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to={`/parametres/categories/${category.id}`}
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    Editer
                                                    <span className="sr-only">
                                                        , {category.name}
                                                    </span>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                    onClick={() =>
                                                        handleClickDeleteCategory(
                                                            category.id
                                                        )
                                                    }
                                                >
                                                    Supprimer
                                                    <span className="sr-only">
                                                        , {category.name}
                                                    </span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
