import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionFetchGigsByUser from "../../store/asyncActions/fetchGigsByUser";
import { Link } from "react-router-dom";
import actionGigDestroy from "../../store/asyncActions/gigDestroy";
import { toast } from "sonner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GigsList() {
  const dispatch = useAppDispatch();

  // recuperation de l id de l utilisateur pour affichage de ses gigs
  const userIdFromState = useAppSelector(
    (state) => state.user.currentUser.id // id du user
  );

    //récupère les données gig depuis le state de redux
    const allGigs = useAppSelector((state) => state.gigs.gigs);
    const allGigsReverse = [...allGigs].reverse();

  useEffect(() => {
    // Dispatch l'action avec l'ID de l'utilisateur
    dispatch(actionFetchGigsByUser({ userId: userIdFromState }));
  }, [dispatch, userIdFromState]);

  function handleClickDeleteGig(id: number): void {
    dispatch(actionGigDestroy({ gigId: id })).then((response) => {
      if (response) {
        dispatch(actionFetchGigsByUser({ userId: userIdFromState }));
        setTimeout(() => {
          toast.success("Le service a été supprimé avec succès");
        }, 1000);
      } else {
        toast.error(
          "Une erreur s'est produite lors de la suppression du service"
        );
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Link to="/parametres/creer-un-service">
        <button className="btn btn-block lg:w-[7rem]">
          Ajouter
          <span className="sr-only">, Ajouter</span>
        </button>
      </Link>
      <ul role="list" className="divide-y divide-gray-100 dark:divide-neutral">
        {allGigsReverse.map((gig) => (
          <li
            key={gig.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <Link to={`/service/${gig.id}/${gig.slug}`}>
              <div className="flex flex-col sm:flex-row">
                <div className="min-w-0">
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <img
                      className="truncate w-auto h-32 mb-3 sm:mx-auto"
                      src={gig.picture}
                      alt="photo du service"
                    />
                  </div>
                </div>

                <div className="min-w-0 sm:pl-4 align-middle">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                      {gig.title}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="truncate">Prix : {gig.price}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="truncate">Créé le : {gig.createdAt}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="truncate">Modifié le : {gig.updatedAt}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <div className="flex flex-row">
                      <p className="truncate pr-2">Est actif :</p>
                      <div>
                        <p className="truncate pr-2">
                          {gig.isActive ? "OUI" : "NON"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-none items-center gap-x-4">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                  <span className="sr-only">Ouvrir les options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/parametres/services/${gig.id}`}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Editer
                          <span className="sr-only">, {gig.title}</span>
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                          onClick={() => handleClickDeleteGig(gig.id)}
                        >
                          Supprimer
                          <span className="sr-only">, {gig.title}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
