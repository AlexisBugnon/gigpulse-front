import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import actionFetchGigsByUser from '../../store/asyncActions/fetchGigsByUser';
import Card from '../Card/Card';

function UserGigs() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // useNavigate pour la navigation
  const { id } = useParams(); // useParams pour obtenir les paramètres d'URL

  useEffect(() => {
    if (id) {
      // Dispatch l'action avec l'ID de l'utilisateur extrait de l'URL
      dispatch(actionFetchGigsByUser({ userId: parseInt(id) }));
    } else {
      // Redirigez l'utilisateur vers une page d'erreur ou faites quelque chose d'autre
      navigate('*');
    }
  }, [dispatch, id, navigate]);

  // récupère les données depuis le state de redux
  const allGigs = useAppSelector((state) => state.gigs.gigs);


  return (
    <div className="max-w-7xl h-auto mx-auto py-12 overflow-hidden">
      <div>
        <img
          className="object-cover mt-6 rounded-full h-36 w-36 mx-auto m-1 p-1 border-4 border-accent"
          src={allGigs[0] && allGigs[0].user.profilePicture}
          alt="Image de profil"
        />
        <div className="px-6 py-4">
          <div>
            <div className="font-bold text-xl text-center text-heading text-accent hover:text-accent dark:text-gray-200">
              {allGigs[0] && allGigs[0].user.name}
            </div>
            <p className="text-black text-sm dark:text-gray-200 text-center text-content">
              {allGigs[0] && allGigs[0].user.job}
            </p>
          </div>
          <div className="flex flex-row justify-center font-semibold mx-auto my-4">
            <button type='button' className="my-auto text-black py-1 px-4 border-2 border-primary dark:bg-primary dark:hover:bg-accent dark:text-gray-200 hover:bg-primary hover:text-white rounded-3xl mx-2"
              onClick={() => 
                window.location.href = `mailto:${allGigs[0].user.email}`
              }
            >
              Message
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-lg text-left my-2 mx-6 dark:text-gray-200 text-content font-semibold text-gray-700">
            Qui suis-je ?
          </h4>
          <p className="mt-2 mb-10 mx-6 text-justify">
            {allGigs[0] && allGigs[0].user.description}
          </p>
        </div>
        <h4 className="text-lg text-left my-2 mx-6 dark:text-gray-200 text-content font-semibold text-gray-700">
          Nombre de service associé:  {allGigs[0] && allGigs[0].user.numberOfGigs}
        </h4>
        <div className="flex flex-wrap justify-around text-base">
          {allGigs.map((gig) => (<Card gig={gig}/>))}
        </div>
      </div>
    </div>
  );
}
export default UserGigs;