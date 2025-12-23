// Sem utilizar o TYPE ORM, apenas para fins didáticos
export default class AccountDomain {
    private id: string;
    private name: string;
    private email: string;
    private passwordHash: string;

    constructor(id: string, name: string, email: string, passwordHash: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    create(name: string, email: string, passwordHash: string): AccountDomain {
        const id = crypto.randomUUID();
        return new AccountDomain(id, name, email, passwordHash);
    }
    
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPasswordHash(): string {
        return this.passwordHash;
    }
}
