import Athlete from "@/types/athlete";
import React, { useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import Output from "@/types/output";
import { sortRank } from "@/utils/sort";
import { HiOutlineDownload } from "react-icons/hi";
import Button from "./styled/button";
import useIsMounted from "@/hooks/use-is-mounted";

interface DownloadProps {
  data: Athlete[];
}

const Download: React.FC<DownloadProps> = ({ data }) => {
  // Prevent hydration error by waiting for component to mount before render
  const mounted = useIsMounted();

  const output = useRef<Output[]>([]);

  useEffect(() => {
    // Ensure outputted data is always sorted by rank
    const orderedData = sortRank(data, true);

    // Format our data for the CSV output based on the Result interface
    const formattedData: Output[] = orderedData.map((element) => {
      return {
        Rank: element.rank,
        "Full Name": `${element.firstname} ${element.surname}`,
        "Finish Time": element.finishtime,
        "Country Code": element.flag,
      };
    });

    // Store our formatted data for reference when downloading
    output.current = formattedData;
  }, [data]);

  return mounted ? (
    <CSVLink data={output.current} filename="race_results">
      <Button>
        <HiOutlineDownload className="text-base" />
        <div className="uppercase">Download Results CSV</div>
      </Button>
    </CSVLink>
  ) : null;
};

export default Download;
