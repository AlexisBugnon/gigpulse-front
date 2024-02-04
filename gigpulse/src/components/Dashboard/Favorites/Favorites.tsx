import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Card from "../../Card/Card";
import actionFetchFavoritesGigs from "../../../store/asyncActions/fetchFavoritesGigs";

export default function Favorites() {
    const favoriteGigsObject = useAppSelector(
        (state) => state.user.currentUser.gigsObjectFavorites
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(actionFetchFavoritesGigs());
    }, []);

    return (
        <div className="mb-12 mx-auto max-w-7xl p-6 lg:p-8">
            <div className="mt-12 text-base"></div>
            <div className="flex flex-wrap gap-3 text-base">
                {favoriteGigsObject === undefined ||
                favoriteGigsObject.length === 0 ? (
                    <p>
                        Pas de favoris encore enregistré, n'hésitez pas à en
                        ajouter
                    </p>
                ) : (
                    favoriteGigsObject.map((gig) => (
                        <Card key={gig.id} gig={gig} />
                    ))
                )}
            </div>
        </div>
    );
}
