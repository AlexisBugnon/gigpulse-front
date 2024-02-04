import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    rgpdConsent: boolean;
}

interface FormErrors {
    [key: string]: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        rgpdConsent: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};
        tempErrors.firstName = formData.firstName
            ? ""
            : "Le prénom est obligatoire.";
        tempErrors.lastName = formData.lastName
            ? ""
            : "Le nom est obligatoire.";
        tempErrors.email = formData.email
            ? ""
            : "L'adresse email est obligatoire.";
        tempErrors.subject = formData.subject
            ? ""
            : "Le sujet est obligatoire.";
        tempErrors.message = formData.message
            ? ""
            : "Le message est obligatoire.";
        tempErrors.rgpdConsent = formData.rgpdConsent
            ? ""
            : "Vous devez accepter la politique de confidentialité.";
        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === "");
    };
    // {target: {name: string; value: string; type: string; checked: boolean}} | ChangeEvent<HTMLInputElement>

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            name,
            value,
            type,
            checked,
        }: { name: string; value: string; type: string; checked?: boolean } =
            e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/contact`,
                formData
            );
            toast.success("Votre message a été envoyé avec succès.");
        } catch (error) {
            toast.error("Erreur lors de l'envoi du formulaire.");
        }
    };

    return (
        <div className="flex items-start py-8 justify-center px-8 min-h-screen sm:py-24">
            <div className="mx-auto w-full max-w-[35rem]">
                <h1 className="font-heading text-2xl sm:text-4xl font-bold leading-10 tracking-tight dark:text-secondary">
                    Contactez-nous !
                </h1>
                <p className="dark:text-secondary text-md sm: text-md sm:text-2xl font-content font-semibold dark:border-secondary my-6">
                    Posez vos questions, partagez vos idées, et laissez-nous
                    vous aider !
                </p>
                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-5 lg:flex lg:justify-between mt-12">
                        <div>
                            <label className="lg:mb-3 block text-base font-medium">
                                Nom
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                className="w-full resize-none rounded-md border p-1.5 text-primary dark:bg-secondary font-medium outline-none focus:border-[#3A979F] focus:shadow-md"
                                onChange={handleInputChange}
                            />
                            <div className="text-error text-xs">
                                {errors.lastName}
                            </div>
                        </div>
                        <div>
                            <label className="lg:mb-3 block text-base font-medium">
                                Prénom
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                className="w-full resize-none rounded-md border p-1.5 text-primary dark:bg-secondary font-medium outline-none focus:border-[#3A979F] focus:shadow-md"
                                onChange={handleInputChange}
                            />
                            <div className="text-error text-xs">
                                {errors.firstName}
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="lg:mb-3 block text-base font-medium">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@domain.com"
                            className="w-full resize-none rounded-md border p-1.5 text-primary dark:bg-secondary font-medium outline-none focus:border-[#3A979F] focus:shadow-md"
                            onChange={handleInputChange}
                        />
                        <div className="text-error text-xs">{errors.email}</div>
                    </div>
                    <div className="mb-5">
                        <label className="lg:mb-3 block text-base font-medium">
                            Titre du message
                        </label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Entrer le titre du message"
                            className="w-full resize-none rounded-md border p-1.5 text-primary dark:bg-secondary font-medium outline-none focus:border-[#3A979F] focus:shadow-md"
                            onChange={handleInputChange}
                        />
                        <div className="text-error text-xs">
                            {errors.subject}
                        </div>
                    </div>
                    <div>
                        <label className="lg:mb-3 block text-base font-medium">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Votre message"
                            name="message"
                            className="w-full resize-none rounded-md border p-1.5 text-primary dark:bg-secondary font-medium outline-none focus:border-[#3A979F] focus:shadow-md"
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="text-error text-xs">
                            {errors.message}
                        </div>
                    </div>
                    <div className="flex mb-5">
                        <input
                            type="checkbox"
                            name="rgpdConsent"
                            className="shrink-0 mt-0.5 rounded focus:ring-[#3A979F] disabled:opacity-50 cursor-pointer checked:bg-[#3A979F]"
                            onChange={handleInputChange}
                        />

                        <label className="text-xs ms-3">
                            En soumettant ce formulaire, vous acceptez notre{" "}
                            <Link
                                to="/politique-de-confidentialite"
                                className="hover:text-success"
                            >
                                Politique de confidentialité.
                            </Link>
                            <span className="text-error text-xs">
                                {errors.rgpdConsent}
                            </span>
                        </label>
                    </div>
                    <div>
                        <button className="dark:bg-base-300 btn w-full lg:w-32 border-1 dark:text-gray-50 text-gray-900 border-gray-600 hover:text-gray-900 dark:hover:text-success dark:hover:border-success">
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
