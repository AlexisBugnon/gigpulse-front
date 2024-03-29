import { Link } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.jpg";
import "./Hero.scss";

export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-primary">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 -mt-24 sm:mt-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <Link to={"/inscription"} className="inline-flex space-x-6 ">
                            <span className="rounded-full bg-white dark:bg-base-100 px-3 py-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 ring-1 ring-gray-900/10 hover:bg-accent transition dark:hover:bg-accent">
                                Inscrivez-vous ici !
                            </span>
                        </Link>
                    </div>
                    <h1 className="font-heading font-semibold mt-10 text-2xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200">
                        Des talents pour chaque projet,{" "}
                        <strong className="font-bold">GigPulse</strong> connecte{" "}
                        <em>freelances</em> et <em>opportunités</em>
                    </h1>
                    <p className="mt-6 text-2xl leading-8 text-white">
                        Commencez dès maintenant !
                    </p>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="relative sm:abosulute max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src={heroBg}
                                alt="App screenshot"
                                width={243}
                                height={1442}
                                className="w-[76rem] rounded-md shadow-2xl dark:shadow- ring-1 ring-gray-900/10"
                            />
                            <div className="absolute inset-0 dark:bg-black opacity-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
