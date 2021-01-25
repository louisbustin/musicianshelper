import jwt from "express-jwt";
import jwks from "jwks-rsa";

export const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://bracketweb.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://eforge.bracket.web/api/v2.0/',
  issuer: 'https://bracketweb.us.auth0.com/',
  algorithms: ['RS256']
});