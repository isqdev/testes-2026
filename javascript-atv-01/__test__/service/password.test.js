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
    const pass = "12345678"

    const userService = new UserService()

    const goodUser = new User({ name: "Isaque", password: pass })

    expect(userService.validatePassMinSize(goodUser.password)).toBe(true)
})

it("should validate a password with at least 1 capital letter", () => {
    const pass = "1234567A"

    const userService = new UserService()
    const goodUser = new User({ name: "Isaque", password: pass })

    expect(userService.validatePassCapitalLetter(goodUser.password)).toBe(true)
})

it("should validate a password with at least 1 number", () => {
    const pass = "1234567A"

    const userService = new UserService()
    const goodUser = new User({ name: "Isaque", password: pass })

    expect(userService.validatePassNumber(goodUser.password)).toBe(true)
})

it("should validate a password with at least 1 special character", () => {
    const pass = "1234567@"

    const userService = new UserService()
    const goodUser = new User({ name: "Isaque", password: pass })

    expect(userService.validatePassSpeciaChar(goodUser.password)).toBe(true)
})

it("should validate no white space in password", () => {
    const pass = "1234567@"

    const userService = new UserService()
    const goodUser = new User({ name: "Isaque", password: pass })

    expect(userService.validatePassWhiteSpace(goodUser.password)).toBe(true)
})



