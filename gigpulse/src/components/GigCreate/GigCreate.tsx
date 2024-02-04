import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import actionFetchTags from "../../store/asyncActions/fetchTags";
import actionFetchCategories from "../../store/asyncActions/fetchCategories";
import actionGigStore from "../../store/asyncActions/gigStore";
import {
    actionInputValueGigStoreForm,
    actionInputValueTagsStoreForm,
} from "../../store/reducers/gigStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function GigCreate() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actionFetchTags());
        dispatch(actionFetchCategories());
    }, []);

    // récupère les tags du state pour affichage dans input
    const tags = useAppSelector((state) => state.tags.tags);

    // récupère les catégories du state pour affichage dans input
    const categories = useAppSelector((state) => state.categories.categories);

    const { title, description, price, picture } = useAppSelector(
        (state) => state.gigStore.inputValueStore
    );
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl h-auto mx-auto p-8 overflow-hidden">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const validateForm = () => {
                        if (!title) {
                            toast.error("Le titre du service est requis.");
                            return false;
                        }
                        if (!description) {
                            toast.error("La description est requise.");
                            return false;
                        }
                        if (!price) {
                            toast.error("Le prix du service est requis.");
                            return false;
                        }
                        if (!picture) {
                            toast.error("L'url de la photo est requise'.");
                            return false;
                        }
                        return true;
                    };

                    if (validateForm()) {
                        // Si la validation du formulaire réussit, dispatch actionGigStore
                        dispatch(actionGigStore()).then((response) => {
                            if (response) {
                                toast.success(
                                    "Le service a été créé avec succès"
                                );
                                setTimeout(() => {
                                    navigate("/parametres/gigs");
                                }, 2000);
                            } else {
                                toast.error(
                                    "Une erreur s'est produite lors de la création du service"
                                );
                                navigate("/parametres/gigs");
                            }
                        });
                    }
                }}
            >
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                            Créer un service
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-900 dark:text-gray-200">
                            Merci de renseigner les champs suivants:
                        </p>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="catégory"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                            >
                                Catégorie
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="catégory"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        dispatch(
                                            actionInputValueGigStoreForm({
                                                type: "category",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-sm p-2 font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5">
                                Tag
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {tags.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`tag-${tag.id}`}
                                            name="tag"
                                            value={tag.id}
                                            className="mr-2"
                                            onClick={(e) => {
                                                // dispatch action mais change le type string en number
                                                dispatch(
                                                    actionInputValueTagsStoreForm(
                                                        parseInt(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    )
                                                );
                                            }}
                                        />
                                        <label
                                            htmlFor={`tag-${tag.id}`}
                                            className="text-gray-900 dark:text-gray-200"
                                        >
                                            {tag.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 ">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="titre"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Titre
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                                        <input
                                            type="text"
                                            value={title}
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block flex-1 border-0 p-1.5 rounded-md dark:bg-secondary text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Titre du service"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigStoreForm(
                                                        {
                                                            type: "title",
                                                            value: e
                                                                .currentTarget
                                                                .value,
                                                        }
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="url"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    URL
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                                        <input
                                            type="url"
                                            value={picture}
                                            name="picture"
                                            id="picture"
                                            autoComplete="picture"
                                            className="block flex-1 border-0 p-1.5 rounded-md dark:bg-secondary text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="URL de la photo du service"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigStoreForm(
                                                        {
                                                            type: "picture",
                                                            value: e
                                                                .currentTarget
                                                                .value,
                                                        }
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">
                                        Merci de valider votre url sous le
                                        format http://mon-url.fr
                                    </p>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Description
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                    <textarea
                                        id="description"
                                        value={description}
                                        name="description"
                                        rows={3}
                                        className="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:bg-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        placeholder="Décrivez votre service"
                                        onChange={(e) => {
                                            dispatch(
                                                actionInputValueGigStoreForm({
                                                    type: "description",
                                                    value: e.currentTarget
                                                        .value,
                                                })
                                            );
                                        }}
                                    />
                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">
                                        Donnez un maximum de détail sur le
                                        service que vous proposez.
                                    </p>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Prix en euros
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            name="price"
                                            value={price}
                                            id="price"
                                            autoComplete="price"
                                            className="block rounded-md flex-1 border-0 dark:bg-secondary p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="prix du service proposé en euro"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigStoreForm(
                                                        {
                                                            type: "price",
                                                            value: e
                                                                .currentTarget
                                                                .value,
                                                        }
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                    Photo du service
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={`/parametres/gigs`}>
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                        >
                            Annulation
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GigCreate;
