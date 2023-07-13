import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const RoleSelection = ({ selectedRole, setSelectedRole, handleRoleChange }) => {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectedRole === 'admin'}
                        onChange={handleRoleChange}
                        value="admin"
                    />
                }
                label="Admin"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectedRole === 'manager'}
                        onChange={handleRoleChange}
                        value="manager"
                    />
                }
                label="Manager"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectedRole === 'student'}
                        onChange={handleRoleChange}
                        value="student"
                    />
                }
                label="Student"
            />
        </FormGroup>
    );
};

export default RoleSelection;
