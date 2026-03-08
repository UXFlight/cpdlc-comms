const DEV_SERVER_URL = "http://127.0.0.1:5321/";
const PROD_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL!
    : DEV_SERVER_URL;