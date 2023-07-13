import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FormInput from './FormUtility.js/FormInput';
import CopyRight from './Tags/CopyRight';
import PersonIcon from '@mui/icons-material/Person';
import ButtonFunc from './FormUtility.js/ButtonFunc';
import { useDispatch } from 'react-redux';
import { setPageState } from '../Slices/authSlice';
import Util from '../Util/AuthClass';
import Notification from './Notifications/Notification';
import axios from 'axios';

const SignUp = () => {
    const dispatch = useDispatch()
    // signup states
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signupState, setSignupState] = useState(false)
    // notification handler
    const [errorState, setErrorState] = useState('')

    // to handle signup config
    const util = new Util(setEmail, setPassword)
    util.set_FirstName(setFirstName)
    util.set_LastName(setLastName)
    util.set_ConfirmPassword(setConfirmPassword)


    // const handle signup
    const handle_SignUp = async (e) => {
        try {
            if ((!firstname) || (!lastname) || (!email) || (!password) || (!confirmPassword))
                throw new Error("ALL FIELDS REQUIRED")
            if (confirmPassword !== password)
                throw new Error("PASSWORD INCORRECT")
            setSignupState(true)
            // userdata
            const user_Data = {
                firstname: firstname,
                lastname: lastname,
                username: email,
                password: password
            }
            // configurations
            const config_Data = {
                'Content-Type': 'application/json'
            }
            const { data } = await axios.post("http://127.0.0.1:8000/api/user/signup", user_Data,
                {
                    headers: config_Data
                })
            console.log(data);
            // if login fails
            if (!data || data.status === false)
                throw new Error(data.message)
            console.log(data);
            setErrorState({ color: 'green', message: 'Signup Sucessfull' })
            setSignupState(false)
        } catch (error) {
            // set up sign up state
            setSignupState(false)
            // set notifcation message
            setErrorState({
                color: 'red',
                message: error.message
            })
            // clear notifcation
            setTimeout(() => {
                setErrorState('')
            }, 3000);

        }
    }


    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={'center'}
                justifyContent={'center'}
                padding={5}
                sx={{
                    position: 'relative',
                    top: -38
                }}
            >
                {/* header  */}
                <Typography
                    variant='h3'
                    sx={{
                        marginBottom: '8px'
                    }}
                >
                    Welcome !!
                </Typography>
                <Typography
                    sx={{
                        color: 'grey',
                        marginBottom: '8px'
                    }}
                >
                    New Here! Please Enter Details Below
                </Typography>
                {/* login credentials */}
                <Box
                    sx={{
                        marginTop: "5px"
                    }}
                >
                    {/* FirstName textfield */}
                    <FormInput
                        labl={"FirstName"}
                        icon={<PersonIcon />}
                        value={firstname}
                        handler={util.handle_First_Name_Change}
                    />
                    <FormInput
                        labl={"LastName"}
                        icon={<PersonIcon />}
                        value={lastname}
                        handler={util.handle_Last_Name_Change}
                    />

                    {/* Email textfield */}
                    <FormInput
                        labl={"Email"}
                        icon={<EmailIcon />}
                        value={email}
                        handler={util.handle_Email_Change}
                    />

                    {/* Password textfield */}
                    <FormInput
                        labl={"Password"}
                        icon={<LockIcon />}
                        value={password}
                        handler={util.handle_Password_Change}
                        type='password'
                    />
                    {/* ConfirmPassword textfield */}
                    <FormInput
                        labl={"Confirm Password"}
                        icon={<LockIcon />}
                        value={confirmPassword}
                        handler={util.handle_Confirm_Password_Change}
                        type='password'
                    />
                </Box>
                {/* Sign up button */}
                <Box sx={{ padding: '10px', width: '98%' }}>
                    <ButtonFunc
                        text={"SignUp"}
                        icon={<LockIcon />}
                        handler={handle_SignUp}
                        disabled={signupState}
                    />
                </Box>
                {/* Redirect to login page */}
                <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{" "}
                        <Button
                            sx={{
                                color: '#ff4081',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                            onClick={(e) => {
                                dispatch(setPageState(true))
                            }}
                        >
                            Login
                        </Button>
                    </Typography>
                </Box>
                <CopyRight />
                {/* show signup spinner */}
                {signupState &&
                    <Box>
                        <CircularProgress
                            sx={{ marginTop: 3 }} />
                    </Box>
                }
                {/* show notifcation message */}
                {errorState &&
                    <Notification errorState={errorState} />
                }
            </Box>
        </div>
    );
}

export default SignUp;
