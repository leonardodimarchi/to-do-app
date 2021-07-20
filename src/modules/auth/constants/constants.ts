require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY.toString(),
  expiresIn: process.env.JWT_EXPIRES_IN.toString(),
}
