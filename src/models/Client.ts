import { User } from './User'

export class Client extends User {
    constructor(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(firstName, lastName, email, password, phoneNumber);
    }
}