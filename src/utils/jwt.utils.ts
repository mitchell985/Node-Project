import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Record<string, unknown>, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    logger.error(error);
    logger.error("Try creating a session");
    return {
      valid: false,
      expired: "jwt expired",
      decoded: null,
    };
  }
}
