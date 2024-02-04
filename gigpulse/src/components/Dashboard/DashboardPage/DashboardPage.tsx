import { useParams } from "react-router-dom";
import Account from "../Account/Account";
import Favorites from "../Favorites/Favorites";
import TagsList from "../TagsList/TagsList";
import Sidebar from "../Sidebar/Sidebar";
import GigCreate from "../../GigCreate/GigCreate";
import GigsList from "../../GigsList/GigsList";
import CategoriesList from "../../CategoriesList /CategoriesList";
import CategoryCreate from "../../CategoryCreate/CategoryCreate";
import Stats from "../Stats/Stats";
import TagCreate from "../../TagCreate/TagCreate";
import AdminGigList from "../AdminGigList/AdminGigList";
import UsersList from "../Userlist/Userlist";
import TagUpdate from "../../TagUpdate/TagUpdate"; // Import TagUpdate component
import CategoryUpdate from "../../CategoryUpdate/CategoryUpdate";
import GigUpdate from "../../GigUpdate/GigUpdate";

// Create a type for route parameters
type RouteParams = {
    slug: string;
    id?: string;
};

// Function to determine which component to display based on the route
function getPageToDisplay(slug: string, id?: string) {
    switch (slug) {
        case "compte":
            return <Account />;
        case "favoris":
            return <Favorites />;
        case "utilisateurs":
            return <UsersList />;
        case "etiquettes":
            return id ? <TagUpdate /> : <TagsList />;
        case "categories":
            return id ? <CategoryUpdate /> : <CategoriesList />;
        case "services":
            return id ? <GigUpdate /> : <GigsList />;
        case "creer-un-tag":
            return <TagCreate />;
        case "creer-un-service":
            return <GigCreate />;
        case "gigs":
            return <GigsList />;
        case "creer-une-categorie":
            return <CategoryCreate />;
        case "statistiques":
            return <Stats />;
        case "liste-services":
            return <AdminGigList />;
        default:
            return <Account />; // By default, display the Account component
    }
}

export default function DashboardPage() {
    const { slug, id } = useParams<RouteParams>();
    const pageToDisplay = getPageToDisplay(slug!, id);

    return (
        <>
            <Sidebar />
            <main className="p-6 sm:p-16 lg:pl-[20rem] bg-base-100 lg:min-h-screen">
                <div className="lg:px-10">{pageToDisplay}</div>
            </main>
        </>
    );
}
