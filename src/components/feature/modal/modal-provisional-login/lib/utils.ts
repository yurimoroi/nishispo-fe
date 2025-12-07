import { ProvisionalDataType } from "./types";

export const COOKIE_FIRST_VISIT_KEY = "miyaspo.has-visited";
export const COOKIE_PROVISIONAL_LOGIN_KEY = "miyaspo.provisional-login";

type BirthYearType = { id: string; label: string };

export const getYearsOfBirth = (
  startYear: number = new Date().getFullYear(),
  rangePast: number = 100,
): BirthYearType[] => {
  return Array.from({ length: rangePast + 1 }, (_, index) => {
    const year = startYear - index;
    return {
      id: year.toString(),
      label: year.toString() + "年",
    };
  }).reverse();
};

export const DEFAULT_PROVISIONAL_DATA: ProvisionalDataType = {
  yearOfBirth: "2000",
  gender: "0",
  favoriteSport: "",
  favoriteGourmet: "",
};
