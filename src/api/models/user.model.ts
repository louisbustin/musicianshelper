import { model, Schema, Model, Document } from 'mongoose';
import * as _ from "lodash";
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { UsersComponent } from 'src/app/admin/users/users.component';

const jwtSecret = "jjfsda783o4t98&Ykjfkoasfso&&#Jfkoso0w293fkafi9rwfk*#*LDPOgigkslf7892";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    sessions: ISession[];
}

export interface ISession   {
    token: string,
    expiresAt: number
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    password: {
        type: String
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    //return everything except the password and sessions, as they should not be passed around
    _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessToken = function() {
    return new Promise((resolve, reject) => {
        //create the JWT for this guy
        jwt.sign({_id: this._id.toWebString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                reject(err);
            }
        });
    })
}

UserSchema.methods.generateRefreshToken = function () {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buffer) => {
            if (!err) {
                return resolve(buffer.toString('hex'));
            }
        })
    })
}

UserSchema.methods.createSession = function () {
    let user = this;

    
}

let saveSessionToDatabase = (user: IUser, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({ token: refreshToken, expiresAt: expiresAt });
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = 10;
    let secondsToExpire = daysUntilExpire * 24 * 60 * 60;
    return (Date.now() / 1000) + secondsToExpire

}
const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
