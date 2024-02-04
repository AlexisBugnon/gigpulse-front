import { MdEuroSymbol } from "react-icons/md";
import RatingStars from "../RatingStars/RatingStars";
import Heart from "../Heart/Heart";
import { Link } from "react-router-dom";
import { Gig } from "../../@types/gig";
export default function Card({ gig }: { gig: Gig }) {
    function extractExcerpt(description: string, maxLength: number) {
        if (description.length <= maxLength) {
            return description;
        } else {
            return description.slice(0, maxLength) + "...";
        }
    }
    const isDesktop = window.innerWidth > 1024;
    return (
        <div
            key={gig.id}
            className="mb-6 card w-96 border border-base-100 dark:border-neutral bg-white dark:bg-base-200 shadow-xl"
        >
            <Link
                to={`/service/${gig.id}/${gig.slug}`}
                className="text-primary"
            >
                <figure>
                    <img
                        className="w-full rounded-t-xl"
                        src={gig.picture}
                        alt="Photo service"
                    />
                </figure>
            </Link>
            <div className="card-body relative pb-[5rem]">
                <div className="absolute left-0 bottom-4 w-full px-[2rem]">
                    {/* div de prix */}
                    <div className="flex flex-row">
                        <p className="flex items-center">
                            {gig.price} <MdEuroSymbol />
                        </p>
                    </div>
                    {/* div des étoiles */}
                    <div className="flex justify-between items-center">
                        <div className="rating text-2xl">
                            <RatingStars
                                averageRating={gig.averageRating as number}
                            />
                        </div>
                        <div>
                            <Heart gigId={gig.id} />
                        </div>
                    </div>
                </div>
                {isDesktop ? (
                    <Link to={`/service/${gig.id}/${gig.slug}`}>
                        {/* div de title */}
                        <div className="flex items-center max-w-full overflow-hidden">
                            <h2 className="card-title">
                                {extractExcerpt(gig.title, 50)}{" "}
                            </h2>
                        </div>
                        {/* div de description */}
                        <div>
                            <p className="text-base text-gray-600 mt-2 max-w-full overflow-hidden pb-1.5">
                                {extractExcerpt(gig.description, 100)}
                            </p>
                        </div>
                        <div>
                            <p className="p-1.5">
                                {" "}
                                <span className=" font-semibold">
                                    Créé le :{" "}
                                </span>
                                {gig.createdAt}
                            </p>
                        </div>
                        <div>
                            <p className="p-1.5">
                                {" "}
                                <span className=" font-semibold">Par : </span>
                                {gig.user.name}
                            </p>
                        </div>
                        <div>
                            <p className="p-1.5">
                                <span className=" font-semibold">
                                    Categorie:{" "}
                                </span>
                                {gig.category}
                            </p>
                        </div>
                        <div>
                            <p className="p-1.5">
                                <span className=" font-semibold">Tags: </span>
                                {gig.tags
                                    ? gig.tags.name.join(", ")
                                    : "Aucun tag"}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div>
                        {/* div de title */}
                        <div className="flex items-center max-w-full overflow-hidden">
                            <h2 className="card-title">
                                {extractExcerpt(gig.title, 50)}{" "}
                            </h2>
                        </div>
                        {/* div de description */}
                        <div>
                            <p className="text-base text-gray-600 mt-2 max-w-full overflow-hidden">
                                {extractExcerpt(gig.description, 100)}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="pb-1.5">
                                {" "}
                                <span className="font-semibold">
                                    Créé le :{" "}
                                </span>
                                {gig.createdAt}
                            </p>
                        </div>
                        <div>
                            <p className="pb-1.5">
                                {" "}
                                <span className="font-semibold">Par : </span>
                                {gig.createdAt}
                            </p>
                        </div>
                        <div>
                            <p className="pb-1.5">
                                {" "}
                                <span className="font-semibold">
                                    Catégorie :{" "}
                                </span>
                                {gig.createdAt}
                            </p>
                        </div>
                        <div className="mb-2">
                            <p className="font-semibold">
                                Tags:{" "}
                                {gig.tags
                                    ? gig.tags.name.join(", ")
                                    : "Aucun tag"}
                            </p>
                        </div>
                        <Link
                            to={`/service/${gig.id}/${gig.slug}`}
                            className="text-success"
                        >
                            Voir plus
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
