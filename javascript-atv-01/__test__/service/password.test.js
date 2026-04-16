it("should validate a password", () => {
    const passwordCorrect = "@Isaqu3"
    const passwordIncorrect = "12345678"

    const userService = new UserService()
    
    const goodUser = new User({ name: "Isaque", password: passwordCorrect })
    const badUser = new User({ name: "Euqasi", password: passwordIncorrect })

    expect(userService.validatePassword(goodUser.password)).toBe(true)
    expect(userService.validatePassword(badUser.password)).toBe(false)
})