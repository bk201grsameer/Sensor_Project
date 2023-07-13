
// Utility.js
class AuthClassHandler {
    constructor(setEmail, setPassword) {
        this.setEmail = setEmail
        this.setPassword = setPassword
        this.setFirstName = null
        this.setLastname = null
        this.setConfirmPassword = null
    }
    // Function to handle email change
    handle_Email_Change = (e) => {
        this.setEmail(e.target.value);
    }
    // Function to handle password change
    handle_Password_Change = (e) => {
        this.setPassword(e.target.value);
    }

    // setFirstname
    set_FirstName = (setFirstName) => {
        this.setFirstName = setFirstName
    }
    // setLastName
    set_LastName = (setLastName) => {
        this.setLastname = setLastName
    }

    // set confirm password
    set_ConfirmPassword = (setConfirmPassword) => {
        this.setConfirmPassword = setConfirmPassword
    }

    // handle confirm password
    handle_Confirm_Password_Change = (e) => {
        this.setConfirmPassword(e.target.value)
    }

    // Function to handle firstname change
    handle_First_Name_Change = (e) => {
        this.setFirstName(e.target.value);
    }

    // Function to handle lastname change
    handle_Last_Name_Change = (e) => {
        this.setLastname(e.target.value);
    }
}

const Util = AuthClassHandler;
export default Util;
