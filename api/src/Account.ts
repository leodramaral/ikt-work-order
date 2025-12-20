import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from "typeorm";

@Entity("accounts")
export default class Account {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 255, name: "password_hash" })
    passwordHash!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @BeforeInsert()
    validate() {
        if (!this.name || this.name.length < 2) throw new Error("Invalid name");
        if (!this.email || !this.email.includes("@")) throw new Error("Invalid email");
        if (!this.passwordHash || this.passwordHash.length < 8) throw new Error("Invalid password hash");
    }

    static create(name: string, email: string, passwordHash: string): Account {
        const account = new Account();
        account.name = name;
        account.email = email;
        account.passwordHash = passwordHash;
        return account;
    }
}
