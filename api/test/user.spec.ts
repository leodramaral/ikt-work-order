import Account from "../src/Account"

test('create a user', () => {
    const account = Account.create('Leandro', 'email@leandro.com', 'hashedpassword');
    expect(account).toBeInstanceOf(Account);
    expect(account.name).toBe('Leandro');
    expect(account.email).toBe('email@leandro.com');
    expect(account.passwordHash).toBe('hashedpassword');
});
