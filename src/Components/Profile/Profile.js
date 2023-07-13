import React from 'react';
import DashApp from '../scenes/global/DashApp';
import { Box } from '@mui/material';
import Header from '../Header';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import ProfileHelper from './ProfileHelper';

const Profile = () => {
    const data = useSelector((state) => state.authState.user);
    const user = data ? data.message.user : '';
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    /* profile helper color */
    const profileHelperColor = colors.blueAccent[600];
    return (
        <DashApp>
            <Box m='20px'>
                <Header title={"Profile"} subtitle={'Your Information'} />
                <Box>
                    <Box
                        display="flex" justifyContent="center" alignItems="center"

                    >
                        <img
                            alt="profile-user"
                            width="300px"
                            height="300px"
                            // user dynamic avatar
                            src={user.avatar}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box
                        marginTop={2}

                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        {/* UserProfile information */}

                        <Box>
                            {/* First Name */}
                            <ProfileHelper tag={'FirstName'} data={user.firstname} color={profileHelperColor} />
                            {/* Last Name */}
                            <ProfileHelper tag={'LastName'} data={user.lastname} color={profileHelperColor} />
                            {/* Email */}
                            <ProfileHelper tag={'Email'} data={user.username} color={profileHelperColor} />
                            {/* Status */}
                            <ProfileHelper tag={'Status'} data={user.isAdmin} color={profileHelperColor} />
                            <ProfileHelper tag={'Organization'} data={'Savonia Universitiy Of Applied Sciences'} color={profileHelperColor} />

                        </Box>


                    </Box>
                </Box>
            </Box>

        </DashApp>
    );
};

export default Profile;