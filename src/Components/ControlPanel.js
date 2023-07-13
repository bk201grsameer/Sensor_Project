import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ControlPanelSideDrawer from './ControlPanelComponents.js/ControlPanelSideDrawer'

const ControlPanel = () => {
    // user state
    const user = useSelector((state) => state.authState.user)

    const navigate = useNavigate()

    // redirecting to home page if the user is not logged in
    // useEffect(() => {
    //     if (!user)
    //         navigate('/')
    //     return () => {

    //     };
    // }, [])
    return (
        <>
            {user &&
                <Box>
                    {/* DashBoard Nav secion */}
                    <ControlPanelSideDrawer />
                </Box>}
            <Box>
                {/* DashBoard Nav secion */}
                <ControlPanelSideDrawer />
            </Box>
        </>

    )
}

export default ControlPanel