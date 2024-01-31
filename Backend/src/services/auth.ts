import jwt, { JsonWebTokenError } from "jsonwebtoken";


export const createJwtToken = (options: object) => {
  const token = jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
  return token;
}

export const vefifyJwtToken = (token: string) => {
  let data: any;
  let error: any;

  try {
    data = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    error = err as JsonWebTokenError;
  }

  return [data, error]

}