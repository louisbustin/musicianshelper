import jwt from "express-jwt";
import jwks from 'jwks-rsa';
import { environment } from '../../environments/environment';

export const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${environment.auth.domain}/.well-known/jwks.json`
  }),
  audience: environment.auth.audience,
  issuer: `https://${environment.auth.domain}/`,
  algorithms: ['RS256']
});