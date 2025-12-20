export default class User {
    constructor(readonly name: string, readonly email: string, readonly passwordHash: string, createdAt: Date) {
        if (!name || name.length < 2) throw new Error("Invalid name");
        if (!email || !email.includes("@")) throw new Error("Invalid email");
        if (!passwordHash || passwordHash.length < 8) throw new Error("Invalid password hash");
    }

    create(name: string, email: string, passwordHash: string): User {
        const createdAt = new Date();
        const user = new User(name, email, passwordHash, createdAt);
        return user;
    }
}