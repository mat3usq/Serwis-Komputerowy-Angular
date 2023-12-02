import { User } from './User'

export class Serviceman extends User {
    constructor(id: number,firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(id,firstName, lastName, email, password, phoneNumber);
    }
    isServiceman(): Boolean{
        return true;
    }
}