import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Field, Formik } from 'formik';
import RoleSelection from './RoleSelection';

const ModalFunc = ({ open, handleClose, colors, selectedRole, handleRoleChange, setSelectedRole, handleUpdate, isupdating }) => {
    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        fontSize: '24px',
                        color: colors.blueAccent[600]
                    }}>
                    {"Update ACCESS LEVEL "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"

                    >

                    </DialogContentText>
                    {/* role selection logic */}
                    <RoleSelection selectedRole={selectedRole} setSelectedRole={setSelectedRole} handleRoleChange={handleRoleChange} />

                </DialogContent>
                <DialogActions>
                    {isupdating && <Box mr={'30px'}>
                        Updating...
                    </Box>}
                    <Button
                        sx={{

                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                        onClick={handleClose}
                    >CLose
                    </Button>
                    <Button autoFocus
                        sx={{

                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default ModalFunc;