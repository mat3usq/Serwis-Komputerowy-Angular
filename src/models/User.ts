export class User {
    private static id: number = 0;
    private userId: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private phoneNumber: string;

    get Email(): string {
        return this.email;
    }
    get Password(): string {
        return this.password;
    }

    constructor(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        this.userId = User.id;
        ++User.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}