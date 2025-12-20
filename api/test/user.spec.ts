import User from "../src/User"

test('create a user', () => {
    const user = new User('Leandro', 'email@leandro.com', 'hashedpassword', new Date());
    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('Leandro');
    expect(user.email).toBe('email@leandro.com');
    expect(user.passwordHash).toBe('hashedpassword');
});
