import jwt from "jsonwebtoken";
import { env } from "../config/env";

type Payload = {
  id: string;
  role: string;
};

export function generateToken(payload: Payload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "1d"
  });
}