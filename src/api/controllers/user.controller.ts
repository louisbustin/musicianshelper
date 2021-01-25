import User, { IUser } from '../models/user.model';
import logger from '../../logger';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';


class UserController {
    constructor() {
    }
    static getAll = (request: Request, response: Response) => {
        UserService.getAll().then((users) => {
            return response.status(200).json(users);
        }).catch((e) => {
            logger.error("Error getting users: " + e);
            return response.status(500).send();
        })
    }
    
    static getOne = (request: Request, response: Response) => {
        UserService.getOne(request.params.userId).then((user) => {
            if (user) {
                return response.status(200).json(user);
            } else {
                return response.status(404).send();
            }
        }).catch((e) => {
            logger.error("unable to get user: " + e);
            return response.status(500).send();
        });

    }

    static getOneByIdAndSessionToken = function (_id: string, token: string) {
        return User.findOne({ "_id": _id, "sessions.token": token });
    }

    static getOneByEmailAndPass = function(email: string, password: string) {

    }

    static create = (request: Request, response: Response) => {
        UserService.create(request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error("unable to create user: " + e);
            return response.status(500).send();
            
        });
    }

    static update = (request: Request, response: Response) => {
       UserService.update(request.params.userId, request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }

    static delete = (request: Request, response: Response) => {
        UserService.delete(request.params.userId).then(() => { 
            return response.status(200).send();
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }

    static getToken = (request: Request, response: Response) => {
        
    }

    static generateAccessToken = (user: IUser) => {
        // return new Promise((resolve, reject) => {
        //     //create the JWT for this guy
        //     jwt.sign(user, jwtSecret, { expiresIn: "15m" }, (err, token) => {
        //         if (!err) {
        //             resolve(token);
        //         } else {
        //             reject(err);
        //         }
        //     });
        // })
    }

    static generateRefreshToken = () => {
        // return new Promise((resolve, reject) => {
        //     crypto.randomBytes(64, (err, buffer) => {
        //         if (!err) {
        //             return resolve(buffer.toString('hex'));
        //         }
        //     })
        // })
    }

    static saveSessionToDatabase = (user, refreshToken) => {
        return new Promise((resolve, reject) => {
            let expiresAt = UserController.generateRefreshTokenExpiryTime();
            user.sessions.push({ token: refreshToken, expiresAt: expiresAt });
            user.save().then(() => {
                return resolve(refreshToken);
            }).catch((e: any) => {
                reject(e);
            })
        })
    }
    static createSession = function () {
        return this.generateRefreshToken().then((refreshToken) => {
            return this.saveSessionToDatabase(this, refreshToken);
        }).then((refreshToken) => {
            return refreshToken;
        }).catch((e) => {
            return Promise.reject("Failed to save session: " + e);
        })
    }

    private static generateRefreshTokenExpiryTime = () => {
        let daysUntilExpire = 10;
        let secondsToExpire = daysUntilExpire * 24 * 60 * 60;
        return (Date.now() / 1000) + secondsToExpire
    
    }
}

/*
// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}
*/


export default UserController;