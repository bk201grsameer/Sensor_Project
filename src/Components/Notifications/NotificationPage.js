import React from 'react';
import DashApp from '../scenes/global/DashApp';
import Header from '../Header';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import { ColorModeContext, tokens } from '../../theme';
import { useContext } from 'react';
import NotificationContent from './NotificationContent';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const NotificationPage = () => {
    // theme config needed
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [notificationsArr, setNotificationsArr] = useState([]);
    const data = useSelector((state) => state.authState.user);
    const user = data.message;
    console.log(`notificationsarr`, notificationsArr);
    const fetch_All_The_Notifications = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/notifications/getallnotifications', {
                headers: {
                    Authorization: user.token
                }
            });
            if (!data)
                throw new Error("SOMETHING WENT WRONG");
            const newDataarr = data.message.slice(-5);//take 5 recent notifications from behind
            setNotificationsArr(newDataarr);
        } catch (error) {
            console.error('[+] something went wrong while fetching all the notifications', error);
        }
    };
    useEffect(() => {
        fetch_All_The_Notifications();
    }, []);

    return (
        <DashApp>
            <Box m='20px'>
                <Header title={'Notifications'} />
                <Box height={600} sx={{}} overflow={'auto'}>
                    {notificationsArr.length !== 0 &&
                        notificationsArr.map((notification, index) => {
                            return <NotificationContent colors={colors} notification={notification} key={index} />;
                        })}
                </Box>
            </Box>
        </DashApp>
    );
};

export default NotificationPage;