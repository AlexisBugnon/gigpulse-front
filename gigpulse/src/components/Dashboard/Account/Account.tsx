import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import updateUser from "../../../store/asyncActions/updateUser";
import { actionUpdateInputsAccountForm } from "../../../store/reducers/user";

export default function Account() {
    const user = useAppSelector((state) => state.user.currentUser);
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !user.name ||
            !user.email ||
            !user.password ||
            !user.job ||
            !user.description
        ) {
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (user.password.length < 8) {
            toast.error("Le mot de passe doit avoir au moins 8 caractères.");
            return;
        }

        try {
            await dispatch(updateUser(user.id));
            toast.success("Profil mis à jour avec succès");
        } catch (error) {
            toast.error("Échec de la mise à jour du profil");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 mx-auto max-w-7xl">
                <div>
                    <h2 className="dark:text-gray-200 font-heading text-2xl font-semibold leading-7 text-gray-900">
                        Mon profil
                    </h2>
                    <p className="mt-1 font-content text-xl leading-6 text-gray-600">
                        Modifications de vos paramètres de profil
                    </p>

                    <div className="mt-10 grid-col-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-1">
                            <label
                                htmlFor="picture"
                                className="block font-content text-xl font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Photo
                            </label>
                            <div className="mt-2 gap-x-3">
                                <img
                                    src={user ? user.profilePicture : ""}
                                    className="h-24 w-24 border-2 border-gray-400 bg-white dark:bg-base-100 rounded-full"
                                    alt="photo de profil"
                                />
                                <input
                                    type="url"
                                    name="profile_picture"
                                    id="picture1"
                                    value={user ? user.profilePicture : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "profilePicture",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full mt-8 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sm:col-span-2 md:col-span-4 mr-auto">
                            <label
                                htmlFor="name"
                                className="block mt-6 font-content font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Nom complet
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={user ? user.name : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "name",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 md:col-span-4 mr-auto">
                            <label
                                htmlFor="email"
                                className="block mt-6 font-content font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user ? user.email : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "email",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 md:col-span-4 mr-auto">
                            <label
                                htmlFor="password"
                                className="block mt-6 font-content font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Mot de passe
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user ? user.password : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "password",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 md:col-span-4 mr-auto">
                            <label
                                htmlFor="job"
                                className="block mt-6 font-content font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Métier
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="job"
                                    id="job"
                                    value={user ? user.job : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "job",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 md:col-span-4 mr-auto">
                            <label
                                htmlFor="about"
                                className="block mt-6 font-content font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                A propos
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    placeholder="Ecrivez une description"
                                    value={user ? user.description : ""}
                                    onChange={(e) => {
                                        dispatch(
                                            actionUpdateInputsAccountForm({
                                                type: "description",
                                                value: e.currentTarget.value,
                                            })
                                        );
                                    }}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-secondary dark:text-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-success dark:bg-accent dark:hover:bg-neutral px-3 py-2 font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    );
}
