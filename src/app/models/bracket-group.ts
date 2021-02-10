import { User } from './user'

export class BracketGroup {
    constructor (
        public _id: string,
        public name: string,
        public description: string,
        public members: BracketGroupMember[],
        public owner: User
    ) {}
}

export class BracketGroupMember {
    constructor(
        public userId: User,
        public role: string,
        public verifyToken: string,
        public verifyDate: Date
    ) {}
}
