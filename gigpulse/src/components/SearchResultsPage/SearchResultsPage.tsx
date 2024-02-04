import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import actionGigSearch from "../../store/asyncActions/gigSearch";
import Card from "../Card/Card";
import Pagination from "../Pagination/pagination";
import { Blocks } from "react-loader-spinner";

function SearchResultPage() {
    const { query, page } = useParams();
    const currentPage = page ? parseInt(page, 10) : 1;
    const currentQuery = query ? query : "";
    const dispatch = useAppDispatch();
    const searchResults = useAppSelector((state) => state.gigSearch);

    useEffect(() => {
        dispatch(actionGigSearch({ query: currentQuery, page: currentPage }));
    }, [dispatch, query, page]);

    if (searchResults.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center text-2xl p-24">
                    <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-heading text-3xl text-center p-8">
                Résultats de recherche pour "{query}"
            </h2>
            {searchResults.gigs && searchResults.gigs.length > 0 ? (
                <>
                    <div className="flex flex-wrap justify-around text-base mb-12 mx-auto max-w-7xl">
                        {searchResults.gigs.map((gig) => (
                            <Card gig={gig} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        lastPage={searchResults.lastPage}
                    />
                </>
            ) : (
                <p className="text-center text-2xl p-24 h-screen">
                    Aucun résultat trouvé.
                </p>
            )}
        </div>
    );
}
export default SearchResultPage;
