import { useCookies } from "next-client-cookies";
import { jwtCookieName } from "~/constants";

export const useGetJwtToken = () => {
  const cookies = useCookies();
  return cookies.get(jwtCookieName) ?? "";
};
