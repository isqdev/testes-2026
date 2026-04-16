class UserService {
    validatePassword(password) {
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[^\s]{8,}$/;
        return passRegex.test(password)
    }

    validatePassMinSize(password) {
        return password.length >= 8
    }

    validatePassCapitalLetter(password) {
        const capitalLetterRegex = /[A-Z]/
        return capitalLetterRegex.test(password)
    }
    validatePassNumber(password) {
        const numberRegex = /\d/
        return numberRegex.test(password)
    }
}

module.exports = UserService