import { Link, useLocation } from "react-router-dom";

export default function Pagination({
    currentPage,
    lastPage,
}: {
    currentPage: number;
    lastPage: number;
}) {
    const location = useLocation();
    const baseUrl = location.pathname.replace(`page/${currentPage}`, "");

    return (
        <div className="join justify-center w-full mb-12">
            <Link
                to={`${baseUrl}page/${currentPage == 1 ? 1 : currentPage - 1}`}
                className="join-item btn"
            >
                «
            </Link>
            <button className="join-item btn">
                Page {currentPage} / {lastPage}
            </button>
            <Link
                to={`${baseUrl}page/${
                    currentPage == lastPage ? currentPage : currentPage + 1
                }`}
                className="join-item btn"
            >
                »
            </Link>
        </div>
    );
}
