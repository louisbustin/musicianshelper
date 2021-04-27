import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import dotenv from 'dotenv';

dotenv.config();

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
  }),
  audience: process.env.audience,
  issuer: `https://${process.env.domain}/`,
  algorithms: ['RS256'],
});

export default checkJwt;
