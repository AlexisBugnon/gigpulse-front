import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChangeEvent, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import actionFetchGigById from '../../store/asyncActions/fetchGigById';
import { actionInputValueReviewStoreForm } from '../../store/reducers/reviewByGigId';
import actionReviewStore from '../../store/asyncActions/reviewStore';
import { toast } from 'sonner';

function ReviewCreate() {

    const dispatch = useAppDispatch();
    // récupère les valeur du param
    const navigate = useNavigate();
    const { id } = useParams();
    const gigId = id ? parseInt(id, 10) : 0;


    const gigDetail = useAppSelector(state => state.gig.gig);
    // récupère les valeur du state pour renseigner input
        
    useEffect(() => {
        dispatch(actionFetchGigById({ gigId: gigId }));
    }, [dispatch, id]);

    function handleOptionChange(e: ChangeEvent<HTMLInputElement>): void {
        dispatch(actionInputValueReviewStoreForm({ type: 'rating', value: e.currentTarget.value }));
    }

    return (
        <div className='max-w-7xl h-auto mx-auto pt-16 overflow-hidden'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(actionReviewStore()).then((response) => {
                        if (response) {
                            toast.success("Le commentaire a été créé avec succès");
                            setTimeout(() => {
                                navigate(`/service/${gigId}/${gigDetail.slug}`);
                            }, 1500);
                        } else {
                            toast.error("Une erreur s'est produite lors de la création du commentaire");
                        }
                    });
                }}>
                <div className="space-y-12 sm:space-y-16 px-12">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">Créer un commentaire du service <span className='text-primary font-bold dark:text-gray-200'>{gigDetail.title} </span></h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-900 dark:text-gray-200">
                            Merci de renseigner les champs suivants:
                        </p>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5 dark:text-gray-200">
                            Combien d'étoiles donneriez-vous pour le service ? Notez de 1 à 5: 5 étant la meilleure note !
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0 dark:text-gray-200">
                                <div className="rating">
                                    <input type="radio" name="rating-2" value="1" onChange={handleOptionChange}
                                     className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" value="2" onChange={handleOptionChange} className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" value="3" onChange={handleOptionChange} className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" value="4" onChange={handleOptionChange} className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" value="5" onChange={handleOptionChange} className="mask mask-star-2 bg-yellow-400" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 dark:text-gray-200">

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5">
                                    Description
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full max-w-2xl rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder ="Partagez votre expérience"
                                        defaultValue={''}
                                        onChange={(e) => {
                                            dispatch(actionInputValueReviewStoreForm({ type: 'description', value: e.currentTarget.value }))
                                        }}
                                    />
                                    <p className="mt-3 text-sm leading-6 text-gray-900 dark:text-gray-200">Partagez votre opinion avec les autres clients</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 pb-12 px-12">
                    <Link to={`/service/${gigDetail.id}/${gigDetail.slug}`}>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                        Annulation
                    </button>
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-success dark:bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm dark:hover:bg-accent hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-200"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form >
        </div >
    )
}

export default ReviewCreate;