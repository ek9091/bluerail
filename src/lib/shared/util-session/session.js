import * as iron from "@hapi/iron";

import { setCookie, getCookie } from "./cookie";

const sessionName = process.env.SESSION_NAME || "token";
const sessionSecret = process.env.SESSION_SECRET;
const maxAge = process.env.SESSION_MAX_AGE || 18000; // default 5 hours

if (sessionSecret === undefined) {
  console.error("Session requires the environment variable 'SESSION_SECRET'");
  process.exit();
}

export async function setSession(data, response) {
  try {
    const session = await iron.seal(
      { data, createdAt: Date.now(), maxAge },
      sessionSecret,
      iron.defaults
    );

    setCookie(sessionName, session, response, { maxAge });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSession(request) {
  const cookie = getCookie(sessionName, request);

  if (!cookie) {
    return { error: "No session has been created" };
  }

  try {
    const session = await iron.unseal(cookie, sessionSecret, iron.defaults);

    if (Date.now() > session.createdAt * 1000) {
      return { error: "Session has expired" };
    }

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export function createSessionMiddleware(authenticate) {
  return async function (request, response, next) {
    try {
      const { error, user } = await authenticate(request);

      if (error === undefined && user) {
        await setSession(user, response);
        request.user = user;
      } else {
        request.user = { error };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function sessionMiddleware() {
  return async function (request, _, next) {
    try {
      const session = await getSession(request);

      if (session.data) {
        request.user = session.data;
      } else if (session.error) {
        request.user = session;
      } else {
        request.user = {
          error: "An error has occurred while processing your request",
        };
      }

      next();
    } catch (error) {
      throw new Error(error);
    }
  };
}
