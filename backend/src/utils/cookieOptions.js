export const options = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: process.env.NODE_ENV === "PROD",
  sameSite: "strict",
};
