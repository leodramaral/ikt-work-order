import Account from "./Account";
import AccountRepository from "./AccountRepository";

export default class Signup {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(input: Input): Promise<string> {
        const account = Account.create(input.name, input.email, input.password);
        const { id } = await this.accountRepository.save(account);
        return id
    }
}

type Input = {
    name: string;
    email: string;
    password: string;
}

