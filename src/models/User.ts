export class User {
    protected id: number = 0;
    protected firstName: string = "";
    protected lastName: string = "";
    protected email: string = "";
    protected password: string = "";
    protected phoneNumber: string = "";


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

    public get Id(): number {
        return this.id;
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