// import type { Handle } from "@sveltejs/kit";
// import * as cookie from "cookie";
import { sequence } from "@sveltejs/kit/hooks";
import { basename } from "path";

const handleHeaders = async ({ event, resolve }:{event:any, resolve:any}) => {
  const response = await resolve(event);
  // Avoid clickjacking attacks, see https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors *.mattmor.in *;"
  );
  return response;
};

export const handle = sequence(handleHeaders);
