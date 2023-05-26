import { config } from "@/config/config";
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
