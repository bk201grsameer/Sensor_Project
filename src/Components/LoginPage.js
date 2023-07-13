import React, { useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FormInput from './FormUtility.js/FormInput';
import CopyRight from './Tags/CopyRight';
import ButtonFunc from './FormUtility.js/ButtonFunc';
import { setPageState, setUser } from '../Slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Util from '../Util/AuthClass';
import axios from 'axios';
import LoginClass from '../Util/LoginClass';
import Notification from './Notifications/Notification';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // login states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginState, setLoginState] = useState(false)
    const [errorState, setErrorState] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // to handle login
    const util = new Util(setEmail, setPassword)
    const loginobj = new LoginClass(email, password, setLoginState, setErrorState)
    loginobj.set_Dispatch(dispatch)
    loginobj.set_User(setUser)
    loginobj.set_Navigation(navigate)



    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: ''
        }}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={'center'}
                justifyContent={'center'}
                padding={5}
                sx={{}}
            >
                {/* header  */}
                <Typography
                    variant='h3'
                    sx={{
                        marginBottom: '8px'
                    }}
                >
                    Welcome Back
                </Typography>
                <Typography
                    sx={{
                        color: 'grey',
                        marginBottom: '8px'
                    }}
                >
                    Welcome Back! Please enter your details
                </Typography>
                {/* login credentials */}
                <Box
                    sx={{
                        marginTop: "5px"
                    }}
                >
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
                </Box>
                {/* login  */}
                <Box sx={{ padding: '10px', width: '98%' }}>
                    <ButtonFunc
                        text={"Login"} icon={<LockIcon />}
                        disabled={loginState}
                        handler={loginobj.handle_Login}
                    />
                </Box>

                {/* redirect to signup page */}
                <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{" "}
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
                                dispatch(setPageState(false))
                            }}
                        >
                            Create one
                        </Button>
                    </Typography>
                </Box>
                <CopyRight />
                {/* show login spinner */}
                {loginState &&
                    <Box>
                        <CircularProgress
                            sx={{ marginTop: 3 }} />
                    </Box>
                }
                {/* show error message */}
                {errorState &&
                    <Notification errorState={errorState} />
                }
            </Box>
        </div >
    );
}

export default LoginPage;
