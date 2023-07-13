import React from 'react'
import Topbar from './Topbar'
import MySideBarPro from './MySideBarPro'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashApp = ({ children }) => {
    const user = useSelector((state) => state.authState.user)
    const navigate = useNavigate()
    // console.log({ user });
    useEffect(() => {
        // redirect user to the frontpage if the user is not logged
        if (!user)
            navigate('/')
    }, [navigate, user])
    return (user && <Box
        display={'flex'} >
        <Box>
            {/* my side bar */}
            <MySideBarPro />
        </Box>
        {/* Top bar */}
        <Box className='content'
            flex={1}
        >
            <Topbar />
            {/* <DashBoardControlPanel /> */}
            <main className='content'>
                {/* this will below render other stuffs */}
                <Box>
                    {children}
                </Box>
            </main>
        </Box>
    </Box >)

}

export default DashApp
