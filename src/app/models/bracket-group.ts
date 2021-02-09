import { User } from './user'

export class BracketGroup {
    constructor (
        public _id: string,
        public name: string,
        public description: string,
        public members: User[],
        public owner: User
    ) {}
}
