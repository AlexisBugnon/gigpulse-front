import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionInputValueCategoryStoreForm } from "../../store/reducers/categories";
import actionCategoryStore from "../../store/asyncActions/categoryStore ";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CategoryCreate() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { name, react_icon, description, picture } = useAppSelector(
        (state) => state.categories.inputValueStore
    );

    return (
        <div className="max-w-7xl h-auto mx-auto p-10 overflow-hidden">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const validateForm = () => {
                        if (!name) {
                            toast.error("Le nom de la catégorie est requis.");
                            return false;
                        }
                        if (!react_icon) {
                            toast.error(
                                "Le réact icon de la catégorie est requis."
                            );
                            return false;
                        }
                        if (!description) {
                            toast.error(
                                "La description de la catégorie est requise."
                            );
                            return false;
                        }
                        if (!picture) {
                            toast.error("L'url de la photo est requise'.");
                            return false;
                        }
                        return true;
                    };

                    if (validateForm()) {
                        dispatch(actionCategoryStore()).then((response) => {
                            if (response) {
                                toast.success(
                                    "La catégorie a été crée avec succès"
                                );
                                setTimeout(() => {
                                    navigate("/parametres/categories");
                                }, 2000);
                            } else {
                                toast.error(
                                    "Une erreur s'est produite lors de la création de la catégorie"
                                );
                                navigate("/parametres/categories");
                            }
                        });
                    }
                }}
            >
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                            Créer une catégorie
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-900 dark:text-gray-200">
                            Merci de renseigner les champs suivants:
                        </p>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Nom
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                                        <input
                                            type="text"
                                            value={name}
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                            placeholder="Nom"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueCategoryStoreForm(
                                                        {
                                                            type: "name",
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
                                    htmlFor="react_icon"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Icone
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm namering-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                                        <input
                                            type="text"
                                            value={react_icon}
                                            name="react_icon"
                                            id="react_icon"
                                            autoComplete="react_icon"
                                            className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                            placeholder="Icone"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueCategoryStoreForm(
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
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="picture"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    URL
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                                        <input
                                            type="url"
                                            value={picture}
                                            name="picture"
                                            id="picture"
                                            autoComplete="picture"
                                            className="block flex-1 rounded-md border-0 p-1.5 text-gray-900 dark:text-primary placeholder:text-gray-400 dark:placeholder:text-pimary dark:bg-secondary focus:ring-0 sm:text-sm sm:leading-6 "
                                            placeholder="URL de la photo du service"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueCategoryStoreForm(
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
                                        value={description}
                                        name="description"
                                        rows={3}
                                        className="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 dark:text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary"
                                        placeholder="Décrivez votre service"
                                        defaultValue={""}
                                        onChange={(e) => {
                                            dispatch(
                                                actionInputValueCategoryStoreForm(
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
                                        Description de la nouvelle catégorie
                                    </p>
                                </div>
                            </div>
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

export default CategoryCreate;
