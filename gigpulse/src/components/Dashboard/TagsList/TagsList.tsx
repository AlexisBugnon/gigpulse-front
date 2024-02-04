import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import actionFetchTags from "../../../store/asyncActions/fetchTags";
import { Link } from "react-router-dom";
import actionTagDestroy from "../../../store/asyncActions/tagDestroy";
import { toast } from "sonner";
import { Blocks } from "react-loader-spinner";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function TagsList() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.tags.isLoading);
    const tags = useAppSelector((state) => state.tags.tags);
    const tagsReverse = [...tags].reverse();

    useEffect(() => {
        dispatch(actionFetchTags());
    }, [dispatch]);

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

    function handleClickDeleteTag(id: number): void {
        dispatch(actionTagDestroy({ tagId: id })).then((response) => {
            if (response) {
                dispatch(actionFetchTags());
                setTimeout(() => {
                    toast.success("L'étiquette a été supprimée avec succès");
                }, 500);
            } else {
                toast.error(
                    "Une erreur s'est produite lors de la suppression de la catégorie"
                );
            }
        });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Link to="/parametres/creer-un-tag">
                <button className="btn btn-block lg:w-[7rem] bg-primary hover:bg-accent">
                    Ajouter
                    <span className="sr-only">, Ajouter</span>
                </button>
            </Link>
            <ul
                role="list"
                className="divide-y divide-gray-100 dark:divide-gray-400"
            >
                {tags &&
                    tagsReverse.map((tag) => (
                        <li
                            key={tag.id}
                            className="flex items-center justify-between gap-x-6 py-5"
                        >
                            <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                        {tag.name}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="truncate">
                                        Créé le : {tag.createdAt}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="truncate">
                                        Modifié le : {tag.updatedAt}
                                    </p>
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
                                                        to={`/parametres/etiquettes/${tag.id}`}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-50"
                                                                : "",
                                                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                        )}
                                                    >
                                                        Editer
                                                        <span className="sr-only">
                                                            , {tag.name}
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
                                                            handleClickDeleteTag(
                                                                tag.id
                                                            )
                                                        }
                                                    >
                                                        Supprimer
                                                        <span className="sr-only">
                                                            , {tag.name}
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
