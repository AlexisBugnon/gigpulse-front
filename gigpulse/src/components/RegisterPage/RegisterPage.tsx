import { useEffect, useState } from "react";
import logoLight from "../../assets/logo-gigpulse-v2.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionRegisterUser from "../../store/asyncActions/registerUser";
import {
    actionResetMessageRegister,
    actionUpdateInputsRegisterForm,
} from "../../store/reducers/register";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const register = useAppSelector((state) => state.register.register);
    const message = useAppSelector((state) => state.register.message);
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);

    useEffect(() => {
        message.content != "" && toast[message.type](message.content);
        if (message.type === "success") {
            setTimeout(() => {
                navigate("/connexion");
            }, 1500);
        }
        dispatch(actionResetMessageRegister());
    }, [message]);

    return (
        <div className="relative flex flex-col items-center overflow-hidden min-h-screen pt-20 px-6 lg:py-[8rem]">
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
                        if (register.password === register.confirmedPassword) {
                            dispatch(actionRegisterUser());
                        } else {
                            toast.error(
                                "Les mots de passe ne correspondent pas. Veuillez réessayer"
                            );
                        }
                    }}
                >
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Nom</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nom"
                            className="w-full input input-bordered dark:bg-secondary dark:text-primary"
                            value={register.name}
                            onChange={(e) => {
                                dispatch(
                                    actionUpdateInputsRegisterForm({
                                        type: "name",
                                        value: e.currentTarget.value,
                                    })
                                );
                            }}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Addresse email"
                            className="w-full input input-bordered dark:bg-secondary dark:text-primary"
                            value={register.email}
                            onChange={(e) => {
                                dispatch(
                                    actionUpdateInputsRegisterForm({
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
                                value={register.password}
                                onChange={(e) => {
                                    dispatch(
                                        actionUpdateInputsRegisterForm({
                                            type: "password",
                                            value: e.currentTarget.value,
                                        })
                                    );
                                }}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 transform -translate-y-1/2 right-3"
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
                    <div>
                        <label className="label">
                            <span className="text-base label-text ">
                                Confirmation du mot de passe
                            </span>
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordShowed ? "text" : "password"}
                                placeholder="Veuillez confirmer votre mot de passe"
                                className="w-full input input-bordered dark:bg-secondary dark:text-primary"
                                value={register.confirmedPassword}
                                onChange={(e) => {
                                    dispatch(
                                        actionUpdateInputsRegisterForm({
                                            type: "confirmedPassword",
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
                    <div>
                        <button className="dark:bg-primary btn btn-block border-1 dark:text-gray-50 text-gray-900 border-gray-600 hover:text-gray-900 dark:hover:text-success dark:hover:border-success">
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
