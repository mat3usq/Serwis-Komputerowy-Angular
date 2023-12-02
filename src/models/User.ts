export class User {
    public id: number = 0;
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public password: string = "";
    public phoneNumber: string = "";


    public get UserId(): number {
        return this.id;
    }
    public get Email(): string {
        return this.email;
    }
    public get Password(): string {
        return this.password;
    }
    public get FirstName(): string {
        return this.firstName;
    }
    public get LastName(): string {
        return this.lastName;
    }
    public get PhoneNumber(): string {
        return this.phoneNumber;
    }

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}