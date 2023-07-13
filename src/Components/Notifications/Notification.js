import { Box } from '@mui/material'
import React from 'react'

const Notification = ({ errorState }) => {
    return (
        <Box
            sx={{
                color: errorState.color,
                padding: '4px',
                fontSize: '22px',
                marginTop: '5px'
            }}
        >
            {'*'}{errorState.message}{'*'}
        </Box>
    )
}

export default Notification