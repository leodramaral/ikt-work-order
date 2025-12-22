import Account from "../domain/Account";
import AccountRepository from "../repository/AccountRepository";


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

