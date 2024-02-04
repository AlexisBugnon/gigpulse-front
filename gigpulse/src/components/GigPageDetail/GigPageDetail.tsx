import { Fragment, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionFetchGigById from "../../store/asyncActions/fetchGigById";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import actionfetchReviewsByGigId from "../../store/asyncActions/fetchReviewsByGigId";
import Heart from "../Heart/Heart";

export default function GigPageDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // useNavigate pour la navigation
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0; // useParams pour obtenir les paramètres d'URL

  useEffect(() => {
    if (id) {
      // Dispatch l'action avec l'ID du gig extrait de l'URL
      dispatch(actionfetchReviewsByGigId({ gigId: id }));
      dispatch(actionFetchGigById({ gigId: id }));
    } else {
      // Redirigez l'utilisateur vers une page d'erreur ou faites quelque chose d'autre
      navigate("*");
    }
  }, []);
  // récupère les données du state pour les détails d'un gig
  const gigDetail = useAppSelector((state) => state.gig.gig);

  // récupère les données du state de gig pour le isLoading
  const isLoadingGig = useAppSelector((state) => state.gig.isLoading);
  // récupère les données du state pour les reviews
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const reviewsReverse = [...reviews].reverse();
  // fonction qui générera le nombre d'étoile par rapport à average rating
  function generateStarRating(rating: number) {
    const maxStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`star-filled-${i}`} />);
    }
  
    for (let i = filledStars; i < maxStars; i++) {
      stars.push(<FaRegStar key={`star-empty-${i}`} />);
    }
  
    return <div className="rating pl-2">{stars}</div>;
  }

  return (
    <div className="bg-white mx-auto max-w-7xl dark:bg-base-100">
      <div className="mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="flex justify-center">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={gigDetail.picture}
                  alt="image du service"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-row">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <Link to={`/gigs/user/${gigDetail.user.id}`}>
                    <img
                      className="object-cover rounded-full h-36 w-36 mx-auto p-1 border-4 border-accent"
                      src={gigDetail.user.profilePicture}
                      alt="Image de l'utilisateur"
                    />
                  </Link>
                  <p className="text-gray-500 my-4 text-center">
                    {" "}
                    {!isLoadingGig && gigDetail.user.name}
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight font-heading text-gray-900 sm:text-3xl  dark:text-white">
                    {gigDetail.title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <p className="flex">{gigDetail.tags ? gigDetail.tags.name.join(", ") : "Aucun tag"}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="mx-auto justify-center text-2xl font-bold p-4">
                {gigDetail.price} €
              </div>
              <div className="p-3 place-self-center text-white text-center bg-primary hover:bg-accent hover:cursor-pointer rounded-md">
                <Link to={`mailto:${gigDetail.user.email}`}>
                  <button>
                    Contacter le vendeur
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-10 pt-10 text-center text-primary text-4xl font-bold">
              <h3 className="text-sm font-medium font-content text-gray-900 dark:text-gray-200">
                Note moyenne du service
              </h3>
              <div className="prose prose-sm mt-4 text-yellow-400 text-5xl">
                <p>{gigDetail.averageRating}</p>
              </div>
            </div>
            <div className="mt-10 border-t border-neutral pt-10">
              <h3 className="text-sm font-medium font-content dark:text-gray-200 text-gray-900">
                Description
              </h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <p>{gigDetail.description}</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <div className="pb-3 flex justify-end">
              <Heart gigId={id} />
            </div>
            <Tab.Group as="div">
              <div className="pb-6">
                <Tab.List className="flex space-x-8 items-center justify-between">
                  <div>
                    <span className="pl-10">{gigDetail.numberOfReviews} </span>
                    commentaires disponibles
                    </div> 
                  <Tab>
                      <Link to={`/${gigDetail.id}/creer-un-commentaire`}>
                        <div className="bg-primary hover:bg-accent hover:secondary text-white font-bold py-2 px-4 border border-accent rounded-full cursor-pointer">
                          Ajouter un commentaire
                        </div>
                      </Link>
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10">
                  {reviewsReverse &&
                    reviewsReverse.length > 0 &&
                    reviewsReverse.map((review) => (
                      <div key={review.id}>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <div className="flex-none py-10">
                            <img
                              src={review.profilePicture}
                              alt="avatar"
                              className="h-10 w-10 rounded-full bg-gray-100"
                            />
                          </div>
                          <div className="border-t border-neutral py-10 w-full">
                            <div className="flex flex-row">
                              <div className="flex flex-col">
                                <h3 className="font-medium text-gray-900 dark:text-gray-200">
                                  {review.userName}
                                </h3>
                                <p>
                                  <time dateTime="2021-07-16">
                                    {review.createdAt}
                                  </time>
                                </p>
                              </div>
                              <div className="flex items-center text-yellow-400 rating pl-2 ">
                                <span>{generateStarRating(review.rating)}</span>
                              </div>
                            </div>
                            <div>
                              <p> {review.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
