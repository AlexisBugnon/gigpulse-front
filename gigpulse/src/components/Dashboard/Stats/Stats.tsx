import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import actionFetchGigsByUser from "../../../store/asyncActions/fetchGigsByUser";
import { Link, useNavigate } from "react-router-dom";
import { Gig } from "../../../@types/gig";
import Block from "../../Block/Block";
export default function Stats() {
    const gigs = useAppSelector(state => state.gigs.gigs);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const id = useAppSelector(state => state.user.currentUser.id);
    // pour les gigs actifs
    const countGigIsActive = (gigs: Gig[]) => {
        const activesGigs = gigs.filter(gig => gig.isActive)
        return activesGigs.length;
    };

    const nbOfActivesGigs = countGigIsActive(gigs);
    // pour les gigs non actifs
    const nbrOfInactifGigs = (gigs.length - nbOfActivesGigs);
    // calcule de la moyenne des notes:
    const calculateAverageRating = (gigs: Gig[]) => {
        if (gigs.length === 0) { return 0; }
    
        const sum = gigs.reduce((accumulateur, gig) => {
            const rating = parseFloat(gig.averageRating as string);
            return (accumulateur + rating);
        }, 0);
    
        const average = sum / gigs.length;
        const averageRating = Math.round(average);
    
        return averageRating;
    };

    const averageRating = calculateAverageRating(gigs);
    // la note la plus élevée et l'ID associé
    const { highestRating, idOfGigWithHighestRating, slugOfGigWithHighestRating } = gigs.reduce((acc, gig) => {
        // Vérifiez si la propriété averageRating existe et est un nombre
        const currentRating = gig.averageRating;
        // Vérifiez si currentRating est un nombre valide (NaN est retourné si la conversion échoue)
        if (!isNaN(currentRating as number)) {
            // Comparaison avec max uniquement si currentRating est un nombre
            if (currentRating > acc.highestRating) {
                return {
                    highestRating: currentRating,
                    idOfGigWithHighestRating: gig.id,
                    slugOfGigWithHighestRating: gig.slug
                };
            } else {
                return acc;
            }
        } else {
            // Retournez acc si currentRating n'est pas un nombre valide
            return acc;
        }
    }, { highestRating: gigs[0]?.averageRating || 0, idOfGigWithHighestRating: gigs[0]?.id || null, slugOfGigWithHighestRating: gigs[0]?.slug || null });
    // COMMENTAIRE AVEC LA NOTE LA MOINS ELEVEE
    const { lowestRating, idOfGigWithLowestRating, slugOfGigWithLowestRating } = gigs.reduce((acc, gig) => {
        // Vérifiez si la propriété averageRating existe et est un nombre
        const currentRating = gig.averageRating;
        // Vérifiez si currentRating est un nombre valide 
        if (!isNaN(currentRating as number)) {
            // Comparaison avec min uniquement si currentRating est un nombre
            if (currentRating < acc.lowestRating) {
                return {
                    lowestRating: currentRating,
                    idOfGigWithLowestRating: gig.id,
                    slugOfGigWithLowestRating: gig.slug
                };
            } else {
                return acc;
            }
        } else {
            // Retournez acc si currentRating n'est pas un nombre valide
            return acc;
        }
    }, { lowestRating: gigs[0]?.averageRating || 0, idOfGigWithLowestRating: gigs[0]?.id || null, slugOfGigWithLowestRating: gigs[0]?.slug || null });
    // NOMBRE DE COMMENTAIRES
    const nbOfReviews = gigs.reduce((acc, gig) => acc + gig.numberOfReviews, 0);
    //SERVICE AYANT GENERE LE PLUS DE COMMENATIRES
    const gigWithMostReviews = gigs.length > 0
        ? gigs.reduce((maxReviewsGig, gig) => {
            const maxReviews = maxReviewsGig.numberOfReviews;
            const currentReview = gig.numberOfReviews;
            return currentReview > maxReviews ? gig : maxReviewsGig;
        }, gigs[0])
        : null;
    const titleOfGigWithMostReviews = gigWithMostReviews ? gigWithMostReviews.title : null;
    const iDOfGigWithMostReviews = gigWithMostReviews ? gigWithMostReviews.id : null;
    const slugOfGigWithMostReviews = gigWithMostReviews ? gigWithMostReviews.slug : null;
    // SERVICE AYANT GENERE LE MOINS DE COMMENTAIRE
    const gigWithFewestReviews = gigs.length > 0
        ? gigs.reduce((minReviewsGig, gig) => {
            const minReviews = minReviewsGig.numberOfReviews;
            const currentReview = gig.numberOfReviews;
            return currentReview < minReviews ? gig : minReviewsGig;
        }, gigs[0])
        : null;
    const titleOfGigWithFewestReviews = gigWithFewestReviews ? gigWithFewestReviews.title : null;
    const iDOfGigWithFewestReviews = gigWithFewestReviews ? gigWithFewestReviews.id : null;
    const slugOfGigWithFewestReviews = gigWithFewestReviews ? gigWithFewestReviews.slug : null;
    useEffect(() => {
        if (id) {
            // Dispatch l'action avec l'ID de l'utilisateur extrait de l'URL
            dispatch(actionFetchGigsByUser({ userId: id }));
        } else {
            // Redirigez l'utilisateur vers une page d'erreur ou faites quelque chose d'autre
            navigate('*');
        }
    }, [dispatch, id, navigate]);

return (
        <div className="min-h-screen">
            <Block title={'Nombre de service(s):'} value={gigs.length}/>
            <Block title={'Nombre de service(s) actif(s):'} value={nbOfActivesGigs}/>
            <Block title={'Nombre de service(s) inactif(s):'} value={nbrOfInactifGigs}/>
            <Block title={'Moyenne des notes:'} value={averageRating}/>
            <Block title={'Nombre de commentaire(s):'} value={nbOfReviews}/>
            <Link to={`/service/${idOfGigWithHighestRating}/${slugOfGigWithHighestRating}`}>
                <Block title={'Note la plus élevée:'} value={highestRating} clickable={true}/>
            </Link>
            <Link to={`/service/${idOfGigWithLowestRating}/${slugOfGigWithLowestRating }`}>
                <Block title={'Note la moins élevée:'} value={lowestRating} clickable={true}/>
            </Link>
            <Link to={`/service/${iDOfGigWithMostReviews}/${slugOfGigWithMostReviews}`}>
                <Block title={'Service qui a généré le plus de commentaires:'} value={titleOfGigWithMostReviews} clickable={true}/>
            </Link>
            <Link to={`/service/${iDOfGigWithFewestReviews}/${slugOfGigWithFewestReviews}`}>
                <Block title={'Service qui a généré le moins de commentaires:'} value={titleOfGigWithFewestReviews} clickable={true}/>
            </Link>
        </div>
    );
}
