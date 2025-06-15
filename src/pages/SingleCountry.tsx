import React from "react";
import { useNavigate, useParams } from "react-router";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface Country {
  name: {
    common: string;
  };
  flags: { svg: string };
  capital: string;
  region: string;
  population: string;
  subregion: string;
  currencies: {};
  languages: {};
  borders: string[];
}
const SingleCountry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState({} as Country);
  const [currencies, setCurrencies] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = `https://restcountries.com/v3.1/name/${id}?fullText=true`;
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(url);
        const data = res.data;
        setIsLoading(false);
        setCountry(data[0]);
        const currency: any = Object.values(data[0]?.languages);
        setCurrencies(currency);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <main className="px-6">
      <div className="my-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 component p-2 shadow border-none outline-none cursor-pointer"
        >
          <FaArrowLeft />
          <p>Back</p>
        </button>
      </div>
      <section className="w-full max-w-6xl mx-auto flex md:items-center flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-20 justify-between">
        {isLoading ? (
          <p> Loading ....</p>
        ) : isError ? (
          <p>There is an error</p>
        ) : (
          <>
            <div className="basis-1/2">
              <img
                src={country?.flags?.svg ?? ""}
                alt="img"
                className="w-full h-[200px] sm:h-[400px] "
              />
            </div>

            <article className="basis-1/2 ">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                {country?.name?.common}
              </h2>
              <div className="mt-5 gap-x-4 grid grid-cols-2 ">
                <p>
                  Native Name: <span>{country?.population}</span>
                </p>
                <p>
                  Population: <span>{country?.population}</span>
                </p>

                <p>
                  Region: <span>{country?.region}</span>
                </p>

                <p>
                  Sub Region: <span>{country?.subregion}</span>
                </p>
                <p>
                  Capital: <span>{country?.capital}</span>
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <p>Languages: </p>
                <div className="flex items-center gap-2">
                  {currencies?.map((cur: any, i) => (
                    <p key={i}>{cur}</p>
                  ))}
                </div>
              </div>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default SingleCountry;
