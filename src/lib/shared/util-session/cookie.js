import { parse, serialize } from "cookie";

const defaultCookieOptions = {
  maxAge: 18000,
  expires: new Date(Date.now() * 18000000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax",
};

export function setCookie(name, data, response, options = {}) {
  response.setHeader(
    "Set-Cookie",
    serialize(name, data, {
      ...defaultCookieOptions,
      ...options,
    })
  );
}

export function removeCookie(name, response) {
  response.setHeader(
    "Set-Cookie",
    serialize(name, "", {
      maxAge: -1,
      path: "/",
    })
  );
}

export function getCookie(name, request) {
  const cookie = request.cookie
    ? request.cookie
    : parse(request?.headers?.cookie || "");
  return cookie[name] || null;
}
