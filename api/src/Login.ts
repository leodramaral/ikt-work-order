import AccountRepository from "./AccountRepository";

export default class Login {
    constructor(readonly accountRepository: AccountRepository) { }

    async execute(input: Input): Promise<boolean> {
        const account = await this.accountRepository.getByEmail(input.email);
        if (!account) {
            return false;
        }
        return account.passwordHash === input.password;
    }
}

type Input = {
    email: string;
    password: string;
}
