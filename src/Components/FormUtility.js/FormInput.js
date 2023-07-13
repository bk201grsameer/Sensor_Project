import React from 'react'
import { TextField } from "@mui/material"
const FormInput = ({ labl, icon, value, handler, type = "text" }) => {
    return (
        <TextField
            label={labl}
            variant="outlined"
            fullWidth
            margin="normal"
            value={value}
            onChange={handler}
            type={type}
            InputProps={{
                startAdornment: icon,
            }}

        />
    )
}

export default FormInput