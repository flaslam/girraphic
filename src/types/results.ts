import Athlete from "./athlete";

export default interface Results {
  raceStatus: string;
  gender: string;
  racename: string;
  tod: string;
  lastupdated: string;
  racelength: number;
  athletes: Athlete[];
}
