class UserService {
    validatePassword(password) {
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[^\s]{8,}$/;
        return passRegex.test(password)
    }

    validatePassMinSize(password) {
        return true
    }
}

module.exports = UserService