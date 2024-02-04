import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    navigate(`/recherche/${searchTerm}/page/1`);
  }

  function handleKeyPress(e: {key: string}) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Rechercher
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 bg-gray-50 dark:bg-base-100 dark:text-gray-200 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Rechercher"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}
