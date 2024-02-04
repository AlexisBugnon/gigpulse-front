import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getTokenFromLocalStorage } from "./localStorage/localStorage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import actionFetchCategories from "./store/asyncActions/fetchCategories";
import "./App.scss";
import Homepage from "./components/Homepage/Homepage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import AboutUs from "./components/AboutUs/AboutUs";
import FaqPage from "./components/FaqPage/FaqPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ContactPage from "./components/ContactPage/ContactPage";
import GigPageDetail from "./components/GigPageDetail/GigPageDetail";
import UserGigs from "./components/UserGigs/UserGigs";
import DashboardPage from "./components/Dashboard/DashboardPage/DashboardPage";
import CgvPage from "./components/CgvPage/CgvPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage/PrivacyPolicyPage";
import LegalesMentionsPage from "./components/LegalesMentionsPage/LegalesMentionsPage";
import CguPage from "./components/CguPage/CguPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import actionCheckValidityToken from "./store/asyncActions/checkValidityToken";
import SearchResultPage from "./components/SearchResultsPage/SearchResultsPage";
import ReviewCreate from "./components/ReviewCreate/ReviewCreate";
import { Toaster } from "sonner";

export default function App() {
    // permet de scroller vers le haut des le chargement de n'importe quelle page du site
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.categories);

    useEffect(() => {
        // scroll en haut de la page
        window.scrollTo(0, 0);
    }, [pathname]);

    // Si on arrive sur le site, on vérifie si un token est stocké dans le localstorage
    useEffect(() => {
        const localDatas = getTokenFromLocalStorage();
        if (localDatas.token) {
            // ici on envoi le token au back pour vérifier s'il est toujours valide.
            // Si c'est le cas, alors on récupère l'objet user associé
            dispatch(actionCheckValidityToken(localDatas.token));
        }
    }, []);

    useEffect(() => {
        dispatch(actionFetchCategories());
    }, []);

    return (
        <div>
            <Toaster richColors />
            <Navbar categories={categories} />
            <TransitionGroup className="transition-group">
                <CSSTransition
                    key={pathname}
                    classNames="page"
                    timeout={300}
                    unmountOnExit
                >
                    <div className="page">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route
                                path="/parametres/:slug?/:id?/page?/:page?"
                                element={
                                    <PrivateRoute>
                                        <DashboardPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/a-propos" element={<AboutUs />} />
                            <Route
                                path="/service/:id/:slug"
                                element={<GigPageDetail />}
                            />
                            <Route
                                path="/categorie/:slug/:id/page/:page"
                                element={<CategoryPage />}
                            />
                            <Route
                                path="/gigs/user/:id"
                                element={<UserGigs />}
                            />
                            <Route
                                path="/recherche/:query/page/:page"
                                element={<SearchResultPage />}
                            />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route
                                path="/inscription"
                                element={<RegisterPage />}
                            />
                            <Route path="/connexion" element={<LoginPage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/cgv" element={<CgvPage />} />
                            <Route path="/cgu" element={<CguPage />} />
                            <Route
                                path="/:id/creer-un-commentaire"
                                element={<ReviewCreate />}
                            />
                            <Route
                                path="/politique-de-confidentialite"
                                element={<PrivacyPolicyPage />}
                            />
                            <Route
                                path="/mentions-legales"
                                element={<LegalesMentionsPage />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer categories={categories} />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}
