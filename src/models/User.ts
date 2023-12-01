export class User {
    private static id: number = 3;
    protected userId: number = 0;
    protected firstName: string = "";
    protected lastName: string = "";
    protected email: string = "";
    protected password: string = "";
    protected phoneNumber: string = "";


    public get UserId(): number {
        return this.userId;
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

    public getUserEmail(): string {
        return this.email;
    }
    public getUserPassword(): string {
        return this.password;
    }

    constructor(firstName: string, lastName: string, email: string, password: string, phoneNumber: string, id?: number) {
        if (id) {
            this.userId = id;
        } else {
            this.userId = User.id;
            ++User.id;
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}