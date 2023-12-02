import { User } from './User'

export class Client extends User {
    isServiceman() : Boolean{
        return false;
      }
    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(id, firstName, lastName, email, password, phoneNumber);
    }
}