import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FormEvent, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import actionFetchCategoryById from "../../store/asyncActions/fetchCategoryById";
import actionCategoryUpdate from "../../store/asyncActions/categoryUpdate";
import { actionInputValueCategoryUpdateForm } from "../../store/reducers/categories";
import { toast } from "sonner";

function CategoryUpdate() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const selectedCategoryId = id ? parseInt(id, 10) : 0;
    const navigate = useNavigate();

    const { name, react_icon, description, picture } = useAppSelector(
        (state) => state.categories.categoriesById
    );

    useEffect(() => {
        if (id) {
            // Dispatch l'action avec l'ID de l'utilisateur extrait de l'URL
            dispatch(
                actionFetchCategoryById({ categoryId: selectedCategoryId })
            );
        } else {
            // Redirigez l'utilisateur vers une page d'erreur
            Navigate({ to: "*" });
        }
    }, [dispatch, id]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const validateForm = () => {
            if (!name) {
                toast.error("Le nom de la catégorie est requis.");
                return false;
            }
            if (!react_icon) {
                toast.error("Le réact icon de la catégorie est requis.");
                return false;
            }
            if (!description) {
                toast.error("La description de la catégorie est requise.");
                return false;
            }
            if (!picture) {
                toast.error("L'url de la photo est requise'.");
                return false;
            }
            return true;
        };

        if (validateForm()) {
            // Dispatch actionGigUpdate with gigId obtained from URL parameters
            dispatch(
                actionCategoryUpdate({ categoryId: selectedCategoryId })
            ).then((response) => {
                if (response) {
                    toast.success("La catégorie a été mise à jour avec succès");
                    setTimeout(() => {
                        navigate("/parametres/categories");
                    }, 2000);
                } else {
                    toast.error(
                        "Une erreur s'est produite lors de la modification de la catégorie"
                    );
                }
            });
        }
    };

    // récupère les données du state pour l'update
    const categoryDetail = useAppSelector(
        (state) => state.categories.categoriesById
    );

    return (
        <div className="max-w-7xl h-auto mx-auto p-24 overflow-hidden">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 ext-gray-900 dark:text-gray-200">
                            Modifier une catégorie
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-900 dark:text-gray-200">
                            Merci de renseigner les champs suivants:
                        </p>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label
                                htmlFor="reactIcon"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                            >
                                Nom
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                        placeholder="name"
                                        value={
                                            categoryDetail
                                                ? categoryDetail.name
                                                : ""
                                        }
                                        onChange={(e) => {
                                            dispatch(
                                                actionInputValueCategoryUpdateForm(
                                                    {
                                                        type: "name",
                                                        value: e.currentTarget
                                                            .value,
                                                    }
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="url"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200  sm:pt-1.5"
                                >
                                    URL de l'image
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="url"
                                            name="picture"
                                            id="picture"
                                            autoComplete="picture"
                                            className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                            placeholder="URL de la photo du service"
                                            // vérifie si gigDetail existe si oui affiche la valeur presente dans gigDetail
                                            value={
                                                categoryDetail
                                                    ? categoryDetail.picture
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueCategoryUpdateForm(
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
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 dark:text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary"
                                        placeholder="Décrivez votre service"
                                        value={
                                            categoryDetail
                                                ? categoryDetail.description
                                                : ""
                                        }
                                        onChange={(e) => {
                                            dispatch(
                                                actionInputValueCategoryUpdateForm(
                                                    {
                                                        type: "description",
                                                        value: e.currentTarget
                                                            .value,
                                                    }
                                                )
                                            );
                                        }}
                                    />
                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">
                                        Description de la catégorie
                                    </p>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Icone
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="reactIcon"
                                            id="reactIcon"
                                            autoComplete="reactIcon"
                                            className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                            value={
                                                categoryDetail
                                                    ? categoryDetail.react_icon
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueCategoryUpdateForm(
                                                        {
                                                            type: "react_icon",
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
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
                    <Link to={`/parametres/categories`}>
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                        >
                            Annulation
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryUpdate;
