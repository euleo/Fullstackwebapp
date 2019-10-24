export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    role: string;

    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.name = '';
        this.surname = '';
        this.role = 'admin';
      }
}