import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import actionFetchSearchGigs from "../../../store/asyncActions/fetchGigs";
import actionAdminGigUpdate from "../../../store/asyncActions/adminGigUpdate";
import { Gig } from "../../../@types/gig";
import Pagination from "../../Pagination/pagination";

export default function AdminGigList() {
  const dispatch = useAppDispatch();
  const gigs = useAppSelector((state) => state.admin.gigs);
  const lastPage = useAppSelector((state) => state.admin.lastPage);
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

useEffect(() => {
  dispatch(actionFetchSearchGigs(currentPage));
}, [dispatch, page]);


const handleToggle = (gig: Gig) => {
    dispatch(actionAdminGigUpdate({ gigId: gig.id, isActive: !gig.isActive }));
};


  return (
    <div className="flex flex-col min-h-screen max-w-7xl">
        <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-700 ">
        {gigs.map((gig) => (
          <li
            key={gig.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="md:flex flex-row">
              <div className="min-w-32">
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <img
                    className="truncate w-auto h-32 mb-3 sm:mx-auto"
                    src={gig.picture}
                    alt="photo du service"
                  />
                </div>
              </div>
              <div className="min-w-8 sm:p-4 align-middle">
                <div className="flex items-start gap-x-3">
                  <p className="font-semibold font-content text-xl leading-6 text-gray-900 dark:text-secondary">
                    {gig.title}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate-24">description : {gig.description}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate">Créé le : {gig.createdAt}</p>
                </div>
                <div className="mt-1 flex items-start gap-x-2 text-xs leading-5 text-gray-500 ">
                  <p className="truncate">Modifié le : {gig.updatedAt}</p>
                </div>
              
              <form className="flex items-center">
                <label className="label cursor-pointer object-right">
                  <span className="label-text m-2">Actif ?</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={gig.isActive}
                    onChange={() => handleToggle(gig)}
                  />
                </label>
              </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} lastPage={lastPage}/>
    </div>
  );
}