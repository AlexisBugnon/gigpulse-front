import NotFoundImg from "../../assets/images/404.jpg";
import {
    CodeBracketIcon,
    PencilIcon,
    BriefcaseIcon,
    PaintBrushIcon,
    PlayCircleIcon,
    AcademicCapIcon,
    MegaphoneIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import "./NotFound.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col justify-center items-center px-4 min-h-screen">
                <div className="flex justify-center items-center">
                    <h1 className="text-center font-heading font-semibold text-2xl sm:text-4xl mb-12">
                        Oups ! La page est introuvable...
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src={NotFoundImg}
                        className="w-4/5 rounded-md shadow-lg"
                    />
                </div>
                <div className="icons-container flex mt-12">
                    <CodeBracketIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-1"
                    />
                    <PencilIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-2"
                    />
                    <BriefcaseIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-3"
                    />
                    <PaintBrushIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-4"
                    />
                    <PlayCircleIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-5"
                    />
                    <AcademicCapIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-6"
                    />
                    <MegaphoneIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-7"
                    />
                    <SquaresPlusIcon
                        className="icon grow h-14 text-sky-800"
                        id="icon-8"
                    />
                </div>
                <div className="mt-8 p-6 text-center leading-8">
                    <p>On dirait que vous avez pris un mauvais chemin…</p>
                    <p>
                        Prêt à retrouver votre route ? Rendez-vous sur la page
                        d'accueil de GigPulse.
                    </p>
                </div>
                <div className=" text-center">
                    <Link
                        className="text-sm font-sans semi-bold text-sky-700"
                        to="/"
                    >
                        Retour à la page d'accueil
                    </Link>
                </div>
            </div>
        </>
    );
}
