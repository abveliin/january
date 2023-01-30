import { jwtVerify, SignJWT } from "jose";

interface I_user_jwt_payload {
  jti: string;
  iat: number;
}
export const get_jwt_secret_key = () => {
  const secret = process.env.ABVELIN_KEY;

  if (!secret || secret.length === 0) {
    throw new Error("the environment variable ABVELIN_KEY is not set");
  }
  return secret;
};
export const verify_auth = async (abvelinJWT: string) => {
  try {
    const verified = await jwtVerify(
      abvelinJWT,
      new TextEncoder().encode(get_jwt_secret_key())
    );
    return verified.payload as I_user_jwt_payload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
