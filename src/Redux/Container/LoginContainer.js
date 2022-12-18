import { UserEmail, UserPassword } from "../Actions/Actions"

const mapStateToProps = state => ({
    userLogin: state.userLogin,
})
const mapDispatchToProps = dispatch => ({
    addUserEmail: (email) => dispatch(UserEmail(email)),
    addUserPassword: (password) => dispatch(UserPassword(password)),
})
export { mapStateToProps, mapDispatchToProps }