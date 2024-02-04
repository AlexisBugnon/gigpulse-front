import { Link } from "react-router-dom";
import logo from "../../assets/logo-gigpulse-v2.svg";
import { Category } from "../../@types/category";
import {
    FaSquareFacebook,
    FaSquareInstagram,
    FaSquareXTwitter,
    FaSquareGithub,
} from "react-icons/fa6";

const navigation = {
    categories: [
        { name: "Développement Web et Mobile", href: "#" },
        { name: "Rédaction & Contenu", href: "#" },
        { name: "Design & Graphisme", href: "#" },
        { name: "Production audiovisuelle", href: "#" },
        { name: "Marketing & Publicité", href: "#" },
        { name: "Stratégie d'Entreprise", href: "#" },
        { name: "Services Quotidiens", href: "#" },
        { name: "Formation & Education", href: "#" },
    ],
    pages: [
        { name: "A propos", href: "/a-propos" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Mentions légales", href: "mentions-legales" },
        {
            name: "Politique de confidentialité",
            href: "/politique-de-confidentialite",
        },
        { name: "Conditions d'utilisation", href: "/cgu" },
        { name: "Conditions générales de vente", href: "/cgv" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: FaSquareFacebook,
        },
        {
            name: "Instagram",
            href: "#",
            icon: FaSquareInstagram,
        },
        {
            name: "Twitter X",
            href: "#",
            icon: FaSquareXTwitter,
        },
        {
            name: "GitHub",
            href: "#",
            icon: FaSquareGithub,
        },
    ],
};


export default function Footer({ categories } : { categories: Category[]}) {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full bg-base-200 relative z-50 border-t-2 border-base-300">
            <div className="mx-auto max-w-7xl flex flex-col justify-center">
                <footer className="footer p-10 text-base-content max-w-7xl">
                    <aside className="place-self-center">
                        <img
                            className="h-24 w-auto"
                            src={logo}
                            alt="logo noir et blanc"
                        />
                    </aside>
                    <nav>
                        <header className="footer-title font-content text-xl">Catégories</header>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`categorie/${category.name}/${category.id}/page/1`}
                                className="link link-hover"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                    <nav>
                        <header className="footer-title font-content text-xl">Navigation</header>
                        {navigation.pages.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="link link-hover"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <nav>
                        <header className="footer-title font-content text-xl">Pages légales</header>
                        {navigation.legal.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="link link-hover"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </footer>
            </div>
            <footer className="bg-base-300 text-xs text-neutral-content">
                <div className="flex flex-col-reverse items-center justify-center p-4 mx-auto max-w-7xl md:flex-row md:justify-between">
                    <aside className="text-gray-600 dark:text-gray-200 mt-8 md:mt-0 md:mb-0">
                        <p>Copyright © {currentYear} - Tous droits réservés</p>
                    </aside>
                    <nav className="flex flex-row justify-center">
                        {navigation.social.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="mx-2 text-gray-900 hover:text-gray-500 dark:text-gray-200 hover:dark:text-gray-400"
                            >
                                <div className="flex">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </footer>
        </div>
    );
}
