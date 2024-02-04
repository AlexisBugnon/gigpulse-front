import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../assets/logo-gigpulse-v2.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    actionResetMessageLogin,
    actionUpdateInputsLoginForm,
} from "../../store/reducers/user";
import actionLoginUser from "../../store/asyncActions/loginUser";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const loginUser = useAppSelector((state) => state.user.login);
    const isLogged = useAppSelector((state) => state.user.logged);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const message = useAppSelector((state) => state.user.message);
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        message.content != "" && toast[message.type](message.content);
        dispatch(actionResetMessageLogin());
        if (isLogged) {
            setIsModalOpen(true); // Ouvrir la modal de succès
            setTimeout(() => {
                setIsModalOpen(false); // Fermer la modal
                navigate("/"); // Rediriger vers la page d'accueil
            }, 2000); // Redirige après 2 secondes
        }
    }, [isLogged, navigate, message]);

    return (
        <div className="relative flex flex-col items-center pt-24 h-screen overflow-hidden">
            <div className="w-11/12 lg:w-full p-6 bg-white border-t-4 border-[#3A979F] dark:bg-neutral rounded-md shadow-md border-top max-w-lg">
                <img
                    className="h-24 w-auto mx-auto"
                    src={logoLight}
                    alt="logo"
                />
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(actionLoginUser());
                    }}
                >
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Addresse email"
                            className="w-full input input-bordered dark:bg-secondary dark:text-primary"
                            value={loginUser.email}
                            onChange={(e) => {
                                dispatch(
                                    actionUpdateInputsLoginForm({
                                        type: "email",
                                        value: e.currentTarget.value,
                                    })
                                );
                            }}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Mot de passe
                            </span>
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordShowed ? "text" : "password"}
                                placeholder="Mot de passe"
                                className="w-full input input-bordered dark:bg-secondary dark:text-primary"
                                value={loginUser.password}
                                onChange={(e) => {
                                    dispatch(
                                        actionUpdateInputsLoginForm({
                                            type: "password",
                                            value: e.currentTarget.value,
                                        })
                                    );
                                }}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 transform -translate-y-1/2 right-3 dark:text-gray-900"
                                onClick={() =>
                                    setIsPasswordShowed(!isPasswordShowed)
                                }
                            >
                                {isPasswordShowed ? (
                                    <FaRegEye />
                                ) : (
                                    <FaRegEyeSlash />
                                )}
                            </button>
                        </div>
                    </div>
                    <p className="text-xs">
                        Vous n'avez pas de compte ?{" "}
                        <Link to={"/inscription"}>
                            <span className="text-xs hover:underline hover:text-success">
                                Inscrivez-vous ici
                            </span>
                        </Link>
                    </p>
                    <div>
                        <button className="dark:bg-primary btn btn-block border-1 dark:text-gray-50 text-gray-900 border-gray-600 hover:text-gray-900 dark:hover:text-success dark:hover:border-success">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="relative z-50"
            >
                {/* Le contenu de la modal */}
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="fixed inset-0 flex items-center justify-center text-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-base-100 p-6">
                        <Dialog.Title>Connexion Réussie</Dialog.Title>
                        <Dialog.Description>
                            Vous allez être redirigé vers la page d'accueil...
                        </Dialog.Description>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
