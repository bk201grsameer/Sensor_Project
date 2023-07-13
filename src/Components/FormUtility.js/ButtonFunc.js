import { Button } from '@mui/material'
import React from 'react'

const ButtonFunc = ({ text, icon, disabled = false, handler }) => {
    return (
        <Button
            sx={{
                backgroundColor: '#ff4081',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: 'bold',
                boxShadow: 'none',
                width: '100%',
                '&:hover': {
                    backgroundColor: '#d81b60',
                },
            }}
            onClick={handler}
            disabled={disabled}
            startIcon={icon} // Add the icon here
        >
            {text}
        </Button>
    )
}

export default ButtonFunc