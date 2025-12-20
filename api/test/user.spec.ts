import Account from "../src/Account"

test('create a user', () => {
    const account = new Account('Leandro', 'email@leandro.com', 'hashedpassword', new Date());
    expect(account).toBeInstanceOf(Account);
    expect(account.name).toBe('Leandro');
    expect(account.email).toBe('email@leandro.com');
    expect(account.passwordHash).toBe('hashedpassword');
});
