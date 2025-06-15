import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { continentOptions } from "../components/Data";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState("");
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const countriesPerPage = 12;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(url);

        setCountries(res.data);
      } catch (error) {
        setError(true);
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [url]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const filteredCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + countriesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleChange = (e) => {
    const option = e.target.value;
    setCurrentPage(1);
    setFilterOptions(e.target.value);
    e.target.value == ""
      ? setUrl("https://restcountries.com/v3.1/all")
      : setUrl(`https://restcountries.com/v3.1/region/${option}`);
  };
  return (
    <main className="px-6 ">
      <article className="mt-4 py-6 flex-between">
        <div className="w-full sm:max-w-xs component flex items-center gap-6 p-5 rounded-md">
          <label>
            <FaSearch />
          </label>
          <input
            type="text"
            aria-label="Search for a country"
            value={searchQuery}
            placeholder="Search for a country ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-none outline-none"
          />
        </div>
        <article>
          <select
            className="component p-4 border-none outline-none"
            value={filterOptions}
            onChange={handleChange}
          >
            <option value="" className="text-lg">
              Filter by continent
            </option>
            {continentOptions.map(({ label, value }, i) => {
              return (
                <option value={value} key={i} className="text-lg">
                  {label}
                </option>
              );
            })}
          </select>
        </article>
      </article>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {error && (
          <p className="text-red-500">
            There is an error fetching the data kindly refresh
          </p>
        )}
        {loading ? (
          <p>Loading ...</p>
        ) : currentCountries.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No countries found.
          </p>
        ) : (
          currentCountries.map(
            (
              { name: { common }, flags: { svg }, population, region, capital },
              index
            ) => (
              <article
                key={index}
                className="dark:bg-dark-blue rounded shadow w-full max-w-sm mx-auto sm:max-w-xs cursor-pointer"
                onClick={() => navigate(`/${common}`)}
              >
                <img
                  src={svg}
                  alt={common}
                  className="w-full max-w-sm sm:w-xs h-[200px]"
                />
                <div className="p-4 pb-10">
                  <h2 className="font-semibold text-lg">{common}</h2>

                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium">
                      Population:{" "}
                      <span className="font-normal">{population}</span>
                    </p>
                    <p className="font-medium">
                      Region: <span className="font-normal">{region}</span>
                    </p>
                    <p className="font-medium">
                      Capital: <span className="font-normal">{capital}</span>
                    </p>
                  </div>
                </div>
              </article>
            )
          )
        )}
      </section>
      <div className="mt-10 p-10 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;
