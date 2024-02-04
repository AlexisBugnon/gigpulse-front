import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionTagStore from "../../store/asyncActions/tagStore";
import { actionInputValueTagStoreForm } from "../../store/reducers/tags";
import { toast } from "sonner";

function TagCreate() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const name = useAppSelector((state) => state.tags.inputValueStore.name);
    return (
        <div className="max-w-7xl h-auto mx-auto p-24 overflow-hidden">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const validateForm = () => {
                        if (!name) {
                            toast.error("Le nom de l'étiquette est requis.");
                            return false;
                        }
                        return true;
                    };

                    if (validateForm()) {
                        dispatch(actionTagStore()).then((response) => {
                            if (response) {
                                toast.success(
                                    "L'étiquette a été crée avec succès"
                                );
                            } else {
                                toast.error(
                                    "Une erreur s'est produite lors de la création de l'étiquette"
                                );
                            }
                            setTimeout(() => {
                                navigate("/parametres/etiquettes");
                            }, 1500);
                        });
                    }
                }}
            >
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                            Créer un tag
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-900 dark:text-gray-200">
                            Merci de renseigner le champ suivant:
                        </p>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="reactIcon"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Nom
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            value={name}
                                            name="name"
                                            id="name"
                                            autoComplete="Nom"
                                            className="block flex-1 border-0 p-1.5 rounded-md text-gray-900  dark:bg-secondary placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Nom"
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueTagStoreForm(
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
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={`/parametres/etiquettes`}>
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

export default TagCreate;
