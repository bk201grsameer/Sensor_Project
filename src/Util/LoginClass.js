import axios from "axios"

class LoginClassHandler {
    constructor(email, password, setLoginState, setErrorState) {
        this.email = email
        this.password = password
        this.setLoginState = setLoginState
        this.setErrorState = setErrorState
        this.dispatch = null
        this.setUser = null
    }
    // setdispatch
    set_Dispatch = (dispatch) => {
        this.dispatch = dispatch
    }
    // set user
    set_User = (setUser) => {
        this.setUser = setUser
    }
    // et navigation
    set_Navigation = (navigate) => {
        this.navigate = navigate
    }

    handle_Login = async (e) => {
        try {
            if (!this.email || !this.password)
                throw new Error("ALL FIELDS REQUIRED")

            // update loginstates
            this.setLoginState(true)
            // data
            const user_Data = {
                username: this.email,
                password: this.password
            }

            // configurations
            const config_Data = {
                'Content-Type': 'application/json'
            }
            const { data } = await axios.post("http://127.0.0.1:8000/api/user/login", user_Data,
                {
                    headers: config_Data
                })
            // if login fails
            if (!data || data.status === false)
                throw new Error(data.message)
            console.log(data);

            // setting errorstate
            this.setErrorState({ color: 'green', message: "Login SuccessFull" })
            // clear the error
            setTimeout(() => {
                // update user state
                this.dispatch(this.setUser(data))
                this.setErrorState('')
                // then navigate to the dashboard
                this.navigate('/dashboard')
            }, 1000);
            this.setLoginState(false)
        } catch (error) {
            // clear the login state
            this.setLoginState(false)
            // update the error state
            this.setErrorState({
                color: 'red',
                message: error.message
            })
            // clear the error
            setTimeout(() => {
                this.setErrorState('')
            }, 3000);
        }
    }

}
const LoginClass = LoginClassHandler;
export default LoginClass;

