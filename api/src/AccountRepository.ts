import { Repository } from "typeorm";
import Account from "./Account";
import { AppDataSource } from "./data-source";

export default interface AccountRepository {
    save(account: Account): Promise<{ id: string}>;
}

export class AccountRepositoryDataBase implements AccountRepository {
    private repository: Repository<Account>;

    constructor() {
        this.repository = AppDataSource.getRepository(Account);
    }

    async save(account: Account): Promise<{ id: string}> {
        const savedAccount = await this.repository.save(account);
        return {
            id: savedAccount.id,
        };
    }
}
