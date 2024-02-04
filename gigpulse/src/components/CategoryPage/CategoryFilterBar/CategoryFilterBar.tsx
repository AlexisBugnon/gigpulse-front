import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  actionResetSelectedTags,
  actionUpdateSelectedTags,
} from "../../../store/reducers/gigsByCategory";
import actionFetchGigsByCategory from "../../../store/asyncActions/fetchGigsByCategory";
import { useParams } from "react-router-dom";

interface Option {
  name: string;
  sort: "average_rating" | "created_at" | "price";
  order: "desc" | "asc";
  current: boolean;
}

const sortOptions: Option[] = [
  {
    name: "Mieux notés",
    sort: "average_rating",
    order: "desc",
    current: false,
  },
  {
    name: "Moins bien notés",
    sort: "average_rating",
    order: "asc",
    current: false,
  },
  { name: "Plus récent", sort: "created_at", order: "desc", current: false },
  { name: "Plus ancien", sort: "created_at", order: "asc", current: false },
  { name: "Moins cher", sort: "price", order: "asc", current: false },
  { name: "Plus cher", sort: "price", order: "desc", current: false },
];

const CategoryFilterBar: React.FC = () => {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const currentPage = params.page ? parseInt(params.page) : 1;
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);
  const selectedOption = useAppSelector(
    (state) => state.categoryGigs.selectedSortOption
  );
  const selectedTags = useAppSelector(
    (state) => state.categoryGigs.selectedTags
  );
  const [selectedTagsMessage, setSelectedTagsMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(actionResetSelectedTags());
  }, [id]);

  useEffect(() => {
    updateSelectedTagsMessage();
  }, [selectedTags]);

  const updateSelectedTagsMessage = () => {
    if (selectedTags.length > 0) {
      const selectedTagsNames = tags
        .filter((tag) => selectedTags.includes(tag.id))
        .map((tag) => tag.name);
      setSelectedTagsMessage(selectedTagsNames.join(", "));
    } else {
      setSelectedTagsMessage(null);
    }
  };

  return (
    <div className="">
      <div className="">
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="rounded-b-xl grid items-center border border-white bg-white dark:bg-base-300 dark:text-gray-200 group-hover:text-gray-200 dark:border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filtres
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-6 sm:divide-x sm:divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium font-content text-black dark:text-gray-200">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-black group-hover:text-black dark:text-gray-200 dark:group-hover:text-gray-200"
                    aria-hidden="true"
                  />
                  Filtres
                </Disclosure.Button>
              </div>
              <div className="flex flex-col sm:flex-row items-start">
                <button
                  type="button"
                  className="text-black font-content dark:text-gray-200 pl-6 sm:pl-4 md:pl-6 lg:pl-8 pb-2 sm:pb-0 sm:mr-4 mb-4 sm:mb-0 mt-4 sm:mt-0"
                  onClick={() => {
                    dispatch(actionResetSelectedTags());
                    dispatch(
                      actionFetchGigsByCategory({
                        page: currentPage,
                        categoryId: id,
                      })
                    );
                  }}
                >
                  Retirer les filtres
                </button>
                <button
                  type="button"
                  className="text-black font-content dark:text-gray-200 pl-6 sm:pl-4 md:pl-6 lg:pl-8 mb-4 sm:mb-0"
                  onClick={() =>
                    dispatch(
                      actionFetchGigsByCategory({
                        page: currentPage,
                        categoryId: id,
                      })
                    )
                  }
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="rounded-b-xl border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:px-8">
              <fieldset key="tags" className="ml-4 sm:pl-4 md:pl-0 lg:pl-8">
                <legend className="block font-content font-medium">Tags</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {tags.map((tag) => (
                    <div
                      key={tag.name}
                      className="flex items-center text-base sm:text-sm ml-4"
                    >
                      <input
                        id={`tag-${tag.name}`}
                        name={`tag[]`}
                        defaultValue={tag.name}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedTags.includes(tag.id) ? true : false}
                        onChange={() => {
                          dispatch(actionUpdateSelectedTags(tag.id));
                          updateSelectedTagsMessage();
                        }}
                      />
                      <label
                        htmlFor={`tag-${tag.name}`}
                        className="ml-3 min-w-0 flex-1 font-content text-black dark:text-gray-200"
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium font-content text-black dark:text-gray-200 hover:text-black">
                    Trier
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-black dark:text-gray-200 dark:group-hover:text-gray-200 group-hover:text-black"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 border border-white rounded-xl">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          <button
                            className="font-medium font-content text-black dark:text-gray-200 p-1 w-full text-left"
                            onClick={() => {
                              dispatch(
                                actionFetchGigsByCategory({
                                  page: currentPage,
                                  categoryId: id,
                                  sort: option.sort,
                                  order: option.order,
                                })
                              );
                            }}
                          >
                            {option.name}
                          </button>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure>

        {selectedTagsMessage && (
          <div className="text-center font-content mt-2 text-sm text-gray-600 dark:text-gray-300">
            Tags sélectionnés : {selectedTagsMessage}
          </div>
        )}

        {selectedOption && (
          <div className="text-center font-content mt-2 text-sm text-gray-600 dark:text-gray-300">
            Tri sélectionné : {selectedOption}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilterBar;
