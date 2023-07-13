import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const NotificationContent = ({ notification, colors }) => {
    return (
        <Card sx={{ minWidth: 275, margin: '10px' }}>
            <CardContent>
                <Typography color={colors.redAccent[1000]} gutterBottom variant='h1'>
                    {notification.type}
                </Typography>
                <Typography variant="h4" component="div" color={colors.blueAccent[400]}>
                    Message : {notification.message}
                </Typography>
                <Typography variant="h4" color={colors.blueAccent[400]}>
                    Date : {notification.date}
                </Typography>
                <Typography variant="h4" color={colors.blueAccent[400]}>
                    Time : {notification.time}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NotificationContent;