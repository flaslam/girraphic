import Athlete from "@/types/athlete";

export const sortRank = (arr: Athlete[], sortAscending: boolean) => {
  return arr.sort((a, b) => {
    const multiplier = sortAscending ? 1 : -1;
    return (a.rank - b.rank) * multiplier;
  });
};

export const sortBibNo = (arr: Athlete[], sortAscending: boolean) => {
  return arr.sort((a, b) => {
    const multiplier = sortAscending ? 1 : -1;
    return (parseInt(a.bibnumber) - parseInt(b.bibnumber)) * multiplier;
  });
};
