import categoriesReducer from "./categories";
import gigsByCategoryReducer from "./gigsByCategory";
import tagsReducer from "./tags";
import featuredReducer from "./feature";
import gigReducer from "./gigById";
import gigsReducer from "./gigsByUser";
import registerReducer from "./register";
import navbarReducer from "./navbar";
import sidebarReducer from "./sidebar";
import reviewsReducer from "./reviewByGigId";
import userReducer from "./user";
import gigStoreReducer from "./gigStore";
import gigSearchReducer from "./gigSearch";
import adminReducer from "./administration";


const reducer = {
    categories: categoriesReducer,
    featuredGig: featuredReducer,
    gigs: gigsReducer,
    register: registerReducer,
    user: userReducer,
    navbar: navbarReducer,
    sidebar: sidebarReducer,
    gig: gigReducer,
    reviews: reviewsReducer,
    categoryGigs: gigsByCategoryReducer,
    tags: tagsReducer,
    gigStore: gigStoreReducer,
    gigSearch: gigSearchReducer,
    admin: adminReducer,
};

export default reducer;
