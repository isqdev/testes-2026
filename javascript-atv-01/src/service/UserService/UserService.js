class UserService {
    validatePassword(password) {

        if (password) {
            return true;
        }
    }
}

module.exports = UserService