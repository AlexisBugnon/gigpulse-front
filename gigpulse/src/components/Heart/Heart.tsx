import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionUpdateFavoriteGigs from "../../store/asyncActions/updateFavoriteGigs";
import { toast } from "sonner";

export default function Heart({ gigId }: { gigId: number }) {
    const favorites = useAppSelector(
        (state) => state.user.currentUser.gigsFavorites
    );
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.logged);

    return (
        <>
            {favorites && isLoggedIn && favorites.includes(gigId) ? (
                // Affiche un cœur rempli si c'est un favori
                <MdFavorite
                    className="text-red-500 cursor-pointer text-2xl"
                    onClick={() =>
                        dispatch(actionUpdateFavoriteGigs(gigId)).then(
                            (response) => {
                                if (response) {
                                    toast.success(
                                        "Le service a été retiré de votre liste de favoris"
                                    );
                                } else {
                                    toast.error(
                                        "Une erreur s'est produite lors du retrait de ce service de votre liste de favoris"
                                    );
                                }
                            }
                        )
                    }
                />
            ) : (
                // Affiche un cœur vide sinon
                <MdFavoriteBorder
                    className="text-red-500 cursor-pointer text-2xl"
                    onClick={() => {
                        if (isLoggedIn) {
                            dispatch(actionUpdateFavoriteGigs(gigId)).then(
                                (response) => {
                                    if (response) {
                                        toast.success(
                                            "Le service a été ajouté à votre liste de favoris"
                                        );
                                    } else {
                                        toast.error(
                                            "Une erreur s'est produite lors de l'ajout de ce service à votre liste de favoris"
                                        );
                                    }
                                }
                            );
                        } else {
                            toast.error(
                                "Vous devez être connecté pour ajouter en favoris"
                            );
                        }
                    }}
                />
            )}
        </>
    );
}
