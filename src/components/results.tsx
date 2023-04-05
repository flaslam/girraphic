import React, { useEffect, useRef, useState } from "react";
import Download from "./download";
import Athlete from "@/types/athlete";
import data from "../data/MarathonResults.json";
import { sortBibNo, sortRank } from "@/utils/sort";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import Results from "@/types/results";
import Flag from "react-world-flags";

const Results = () => {
  const [results, setResults] = useState<Results>(data.results || null);
  const [athletes, setAthletes] = useState<Athlete[]>(results.athletes || []);

  const [rankSortedAsc, setRankSortedAsc] = useState<boolean | null>(true);
  const [bibNoSortedAsc, setBibNoSortedAsc] = useState<boolean | null>(null);

  // On component mount
  useEffect(() => {
    // Load data, in prod this would be a fetch request and then parsing JSON
    setResults(data.results as Results);
  }, []);

  // On results changing
  useEffect(() => {
    // Sort athlete data by rank before displaying
    const sortedAthletes = sortRank(results.athletes, true);

    // Set athlete data for table output
    setAthletes(sortedAthletes);
  }, [results]);

  const handleSortRank = () => {
    setRankSortedAsc((prevState) => {
      setAthletes((prevAthletes) => sortRank(prevAthletes, !prevState));
      return !prevState;
    });

    setBibNoSortedAsc(null);
  };

  const handleSortBibNumber = () => {
    setBibNoSortedAsc((prevState) => {
      setAthletes((prevAthletes) => sortBibNo(prevAthletes, !prevState));
      setRankSortedAsc(null);
      return !prevState;
    });
  };

  const sortIcon = (ascending: boolean | null) => {
    if (ascending === null) return null;
    return ascending ? <HiOutlineSortAscending /> : <HiOutlineSortDescending />;
  };

  const formatDateString = (dateString: string): string => {
    const dateObj = new Date(Date.parse(dateString));
    return dateObj.toLocaleDateString("en-GB");
  };

  return (
    <div className="container mx-auto max-w-screen-lg px-4 md:px-8">
      <div className="pb-12 font-heading">
        <div className="relative flex items-center justify-center py-24 text-center text-2xl font-black uppercase">
          <h1 className="absolute -z-10 text-8xl text-black">Race Results</h1>
          <span className="font-normal">Race</span>&nbsp;Results
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-0">
          <div className="grow">
            <div className="flex gap-2">
              <div className="text-3xl font-black uppercase">
                {results.racename}
              </div>
            </div>

            <div className="flex gap-2">
              <h2 className="text-2xl">{formatDateString(results.tod)}</h2>

              <h2 className="text-2xl uppercase">{results.gender} race</h2>
            </div>
          </div>

          <div className="flex md:justify-end">
            <Download data={athletes} />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 md:p-8 [&>*:nth-child(odd)]:bg-zinc-800">
        <div className="flex !bg-brand font-heading font-bold uppercase text-black [&>*]:basis-2/12 [&>*]:px-4 [&>*]:py-2">
          <div
            className="flex basis-2/12 cursor-pointer justify-center gap-2 transition hover:!bg-brand-light"
            onClick={handleSortRank}
          >
            <div>Rank</div>
            <div className="hidden md:block">{sortIcon(rankSortedAsc)}</div>
          </div>

          <div
            className="flex basis-2/12 cursor-pointer items-center justify-center gap-2 transition hover:!bg-brand-light"
            onClick={handleSortBibNumber}
          >
            <div>Bib No.</div>
            <div className="hidden md:block">{sortIcon(bibNoSortedAsc)}</div>
          </div>
          <div className="!basis-6/12 md:!basis-4/12">Full Name</div>
          <div className="hidden basis-2/12 text-center md:block">
            Finish Time
          </div>
          <div className="basis-2/12 text-center">Country</div>
        </div>

        {athletes &&
          athletes.map((athlete, index) => (
            <div
              key={index}
              className="flex items-center [&>*]:px-4 [&>*]:py-2"
            >
              <div className="basis-2/12 text-center">{athlete.rank}</div>
              <div className="basis-2/12 text-center">{athlete.bibnumber}</div>
              <div className="basis-6/12 truncate md:basis-4/12">
                {athlete.firstname} {athlete.surname.toUpperCase()}
              </div>
              <div className="hidden basis-2/12 text-center md:block">
                <div>{athlete.finishtime}</div>
                <div className="text-xs uppercase">{athlete.raceprogress}</div>
              </div>
              <div className="flex basis-2/12 flex-col justify-center text-center">
                <div className="hidden md:block">{athlete.countryname}</div>

                <div className="flex w-full items-center justify-center">
                  <div className="w-6">
                    <Flag
                      code={athlete.flag}
                      fallback={
                        <div className="text-xs uppercase">{athlete.flag}</div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!athletes && (
          <div className="py-3 text-center">No records loaded.</div>
        )}
      </div>
    </div>
  );
};

export default Results;
