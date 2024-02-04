import actionFetchFeatured from "../../store/asyncActions/fetchFeaturedGig";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Card from "../Card/Card";

export default function Featured() {
    const { featureGigs } = useAppSelector((state) => state.featuredGig);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actionFetchFeatured());
    }, [dispatch]);

    return (
        <>
            <div className="mx-auto max-w-7xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                    Ajoutés récemment
                </h2>
                <div className="mt-12 text-base"></div>
                <div className="flex flex-wrap justify-around text-base">
                    {featureGigs.map((gig) => (
                        <Card key={gig.id} gig={gig}/>
                    ))}
                </div>
            </div>
        </>
    );
}

