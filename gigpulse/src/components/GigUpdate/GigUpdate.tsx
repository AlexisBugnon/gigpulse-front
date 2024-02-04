import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FormEvent, useEffect } from "react";
import actionFetchTags from "../../store/asyncActions/fetchTags";
import actionFetchCategories from "../../store/asyncActions/fetchCategories";
import { actionInputValueTagsStoreForm } from "../../store/reducers/gigStore";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import actionFetchGigById from "../../store/asyncActions/fetchGigById";
import actionGigUpdate from "../../store/asyncActions/gigUpdate";
import { toast } from "sonner";
import { actionInputValueGigUpdateForm } from "../../store/reducers/gigById";
function GigUpdate() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const selectedCategoryId = id ? parseInt(id, 10) : 0;
    // recuperation pour utilisation de la redirection
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            // Dispatch l'action avec l'ID de l'utilisateur extrait de l'URL
            dispatch(actionFetchGigById({ gigId: selectedCategoryId }));
            dispatch(actionFetchTags());
            dispatch(actionFetchCategories());
        } else {
            // Redirigez l'utilisateur vers une page d'erreur
            Navigate({ to: "*" });
        }
    }, [dispatch, selectedCategoryId]);
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
            // Dispatch actionGigUpdate with gigId obtained from URL parameters
            dispatch(actionGigUpdate({ gigId: selectedCategoryId })).then(
                (response) => {
                    if (response) {
                        dispatch(actionFetchGigById({ gigId: selectedCategoryId }));
                        toast.success("Le service a été mise à jour avec succès");
                        setTimeout(() => {
                            navigate("/parametres/gigs");
                        }, 2000)
                    } else {
                        toast.error(
                            "Une erreur s'est produite lors de la modification du service"
                        );
                        navigate("/parametres/gigs");
                    }
                }
            );
        }
    };
    // récupère les tags du state pour affichage dans input
    const tags = useAppSelector((state) => state.tags.tags);
    const tagsId = useAppSelector((state) => state.gig.gigUpdate.tags.ids);
    // récupère les catégories du state pour affichage dans input
    const categories = useAppSelector((state) => state.categories.categories);
    // récupère les données du state pour l'update
    const gigDetail = useAppSelector((state) => state.gig.gigUpdate);
    const { title, description, price, picture } = useAppSelector((state) => state.gig.gigUpdate);
    return (
        <div className="max-w-7xl h-auto mx-auto pt-24 overflow-hidden">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                            Modifier un service
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
                                    value={gigDetail && gigDetail.categoryId}
                                    className="block flex-1 rounded-md p-1.5 text-gray-900 dark:text-gray dark:bg-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        dispatch(
                                            actionInputValueGigUpdateForm({
                                                type: "categoryId",
                                                value: parseInt(e.currentTarget.value),
                                            })
                                        );
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5">
                                Tag
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {tags.map((tag) => (
                                    <div key={tag.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`tag-${tag.id}`}
                                            name="tag"
                                            className="mr-2"
                                            checked={gigDetail && tagsId && tagsId.includes(tag.id)}
                                            onClick={() => {
                                                // dispatch action mais change le type string en number
                                                dispatch(actionInputValueTagsStoreForm(tag.id));
                                            }}
                                        />
                                        <label htmlFor={`tag-${tag.id}`} className="text-gray-900 dark:text-gray-200">
                                            {tag.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="titre"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Titre
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block flex-1 rounded-md p-1.5 text-gray-900 dark:text-gray dark:bg-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            value={gigDetail ? gigDetail.title : ""}
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigUpdateForm({
                                                        type: "title",
                                                        value: e.currentTarget.value,
                                                    })
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
                                    URL de l'image
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="url"
                                            name="picture"
                                            id="picture"
                                            autoComplete="picture"
                                            className="block flex-1 rounded-md p-1.5 text-gray-900 dark:text-gray dark:bg-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            placeholder="URL de la photo du service"
                                            // vérifie si gigDetail existe si oui affiche la valeur presente dans gigDetail
                                            value={gigDetail ? gigDetail.picture : ""}
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigUpdateForm({
                                                        type: "picture",
                                                        value: e.currentTarget.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">
                                        Merci de valider votre url sous le format http://mon-url.fr
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
                                        className="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 dark:text-gray dark:bg-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        placeholder="Décrivez votre service"
                                        value={gigDetail ? gigDetail.description : ""}
                                        onChange={(e) => {
                                            dispatch(
                                                actionInputValueGigUpdateForm({
                                                    type: "description",
                                                    value: e.currentTarget.value,
                                                })
                                            );
                                        }}
                                    />

                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">

                                        Donnez un maximum de détail sur le service que vous
                                        proposez.
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
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            autoComplete="price"
                                            className="block flex-1 rounded-md p-1.5 text-gray-900 dark:text-gray dark:bg-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            value={gigDetail ? gigDetail.price : ""}
                                            onChange={(e) => {
                                                dispatch(
                                                    actionInputValueGigUpdateForm({
                                                        type: "price",
                                                        value: parseInt(e.currentTarget.value),
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
                                >
                                    Service actif/inactif
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center">
                                    <span className="label-text m-2">{gigDetail.isActive ? "Actif" : "Inactif"}</span>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={gigDetail.isActive}
                                        onChange={() => {
                                            dispatch(
                                                actionInputValueGigUpdateForm({
                                                    type: "isActive",
                                                    value: !gigDetail.isActive,
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            </div>
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
                        className="inline-flex justify-center rounded-md bg-success dark:bg-primary dark:hover:bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    );
}
export default GigUpdate;