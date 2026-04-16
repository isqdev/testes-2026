const User = require("../../src/models/User")
const UserService = require("../../src/service/UserService/UserService")

it("should validate a password", () => {
    const passwordCorrect = "@Isaque777"
    const passwordIncorrect = "12345678"

    const userService = new UserService()

    const goodUser = new User({ name: "Isaque", password: passwordCorrect })
    const badUser = new User({ name: "Euqasi", password: passwordIncorrect })

    expect(userService.validatePassword(goodUser.password)).toBe(true)
    expect(userService.validatePassword(badUser.password)).toBe(false)
})

it("should validate a password with a min size", () => {
    const passwordCorrect = "12345678"
    const passwordIncorrect = "123"

    const userService = new UserService()

    const goodUser = new User({ name: "Isaque", password: passwordCorrect })
    const badUser = new User({ name: "Euqasi", password: passwordIncorrect })

    expect(userService.validatePassMinSize(passwordCorrect)).toBe(true)
})

