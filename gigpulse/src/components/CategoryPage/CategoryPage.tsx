import GigCard from "./GigCard/GigCard";
import CategoryBanner from "./CategoryBanner/CategoryBanner";
import CategoryFilterBar from "./CategoryFilterBar/CategoryFilterBar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import actionFetchCategories from "../../store/asyncActions/fetchCategories";
import actionFetchTags from "../../store/asyncActions/fetchTags";
import { useParams } from "react-router-dom";
import actionFetchGigsByCategory from "../../store/asyncActions/fetchGigsByCategory";
import Pagination from "../Pagination/pagination";

export default function CategoryePage() {
  const dispatch = useAppDispatch();
  const { id, page } = useParams();
  const selectedCategoryId = id ? parseInt(id, 10) : 0;
  const currentPage = page ? parseInt(page, 10) : 1;
  const lastPage = useAppSelector((state) => state.categoryGigs.lastpage);

  useEffect(() => {
    dispatch(actionFetchCategories());
    dispatch(actionFetchTags());
  }, []);

  useEffect(() => {
    dispatch(actionFetchGigsByCategory({page: currentPage, categoryId: selectedCategoryId}));
  },[page]);

  return (
    <div className="mx-auto max-w-7xl">
      <CategoryBanner />
      <CategoryFilterBar />
      <GigCard />
      <Pagination currentPage={currentPage} lastPage={lastPage}/>
    </div>
  );
}
