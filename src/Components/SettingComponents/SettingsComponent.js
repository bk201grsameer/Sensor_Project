import React, { useState } from 'react';
import DashApp from '../scenes/global/DashApp';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FormInput from '../FormUtility.js/FormInput';
import PersonIcon from '@mui/icons-material/Person';

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Header from '../Header';
import ButtonFunc from '../FormUtility.js/ButtonFunc';
import Notification from '../Notifications/Notification';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SettingsComponent = () => {
    // user config 
    const data = useSelector((state) => state.authState.user);
    const user = data.message;
    const [firstname, setFirstName] = useState(user ? user.user.firstname : '');
    const [lastname, setLastName] = useState(user ? user.user.lastname : '');
    const [email, setEmail] = useState(user ? user.user.username : "");
    const [password, setPassword] = useState('testpassword');
    const [confirmPassword, setConfirmPassword] = useState('testpassword');
    const [updateState, setUpdateState] = useState(false);
    const navigate = useNavigate();
    // notification handler
    const [errorState, setErrorState] = useState('');


    // handle firstname change
    const handle_First_Name_Change = (e) => {
        setFirstName(e.target.value);
    };
    // handle firstname change
    const handle_Last_Name_Change = (e) => {
        setLastName(e.target.value);
    };
    // handle email change
    const handle_Email_Change = (e) => {
        setEmail(e.target.value);
    };
    // handle firstname change
    const handle_Password_Change = (e) => {
        setPassword(e.target.value);
    };
    // handle firstname change
    const handle_Confirm_Password_Change = (e) => {
        setConfirmPassword(e.target.value);
    };


    // handle update
    const handle_Update = async (e) => {
        try {
            if ((!firstname) || (!lastname) || (!email) || (!password) || (!confirmPassword))
                throw new Error("ALL FIELDS REQUIRED");
            if (confirmPassword !== password)
                throw new Error("PASSWORD INCORRECT");
            console.log({ firstname, lastname, email, password, confirmPassword });
            setUpdateState(true);
            // userdata
            const user_Data = {
                firstname: firstname,
                lastname: lastname,
                username: email,
                password: password
            };
            // configurations
            const config_Data = {
                'Content-Type': 'application/json',
                "Authorization": user.token
            };
            const { data } = await axios.put("http://127.0.0.1:8000/api/user/updateuser", user_Data,
                {
                    headers: config_Data,

                });
            console.log(data);
            // if login fails
            if (!data || data.status === false)
                throw new Error(data.message);
            console.log(data);
            setErrorState({ color: 'green', message: 'Updated Sucessfull' });
            setUpdateState(false);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setUpdateState(false);
            // update the notification
            setErrorState({
                color: 'red',
                message: error.message
            });
            // after n seconds clear the error
            setTimeout(() => {
                setErrorState('');
            }, 3000);
        }
    };
    return (
        <DashApp>
            <Box m='20px'>
                <Header title={"Settings"} subtitle={'Update Information'} />
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
                        handler={handle_First_Name_Change}
                    />
                    <FormInput
                        labl={"LastName"}
                        icon={<PersonIcon />}
                        value={lastname}
                        handler={handle_Last_Name_Change}
                    />

                    {/* Email textfield */}
                    <FormInput
                        labl={"Email"}
                        icon={<EmailIcon />}
                        value={email}
                        handler={handle_Email_Change}
                    />

                    {/* Password textfield */}
                    <FormInput
                        labl={"New Password"}
                        icon={<LockIcon />}
                        value={password}
                        handler={handle_Password_Change}
                        type='password'
                    />
                    {/* ConfirmPassword textfield */}
                    <FormInput
                        labl={"Confirm New Password"}
                        icon={<LockIcon />}
                        value={confirmPassword}
                        handler={handle_Confirm_Password_Change}
                        type='password'
                    />
                </Box>
                {/* Sign up button */}
                <Box >
                    <ButtonFunc
                        text={"Update Information"}
                        icon={<LockIcon />}
                        handler={handle_Update}
                    />
                </Box>
                {/* show notifcation message */}
                {errorState &&
                    <Notification errorState={errorState} />
                }
            </Box>
        </DashApp>
    );
};

export default SettingsComponent;