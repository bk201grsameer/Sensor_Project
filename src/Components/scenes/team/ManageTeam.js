import React from 'react';
import DashApp from '../global/DashApp';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from '../../Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Loading from '../../Loading/Loading';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModalFunc from '../../ModalFunc/ModalFunc';
import Notification from '../../Notifications/Notification';
import { useNavigate } from 'react-router-dom';

const ManageTeam = () => {
    // theme config
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // user config
    const data = useSelector((state) => state.authState.user);
    const user = data.message;

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // update access state
    const [checkedRole, setCheckedRole] = useState('');
    const [selectedID, setSelectedID] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [updateState, setUpdateState] = useState(false);
    const [errorState, setErrorState] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    console.log({ checkedRole });
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedRole(value);
        } else {
            setCheckedRole('');
        }
    };

    /* MODAL CONFIG */
    const [open, setOpen] = useState(false);
    /* HANDLE MODAL OPEN CLOSE */
    const handleClickOpen = (user) => {
        setOpen(true);
        logic(user);
    };

    /* HANDLE MODAL OPEN CLOSE */
    const handleClose = () => {
        setOpen(false);
    };

    console.log(`get derived`, users);
    const fetch_ALL_Users = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://127.0.0.1:8000/api/user/getallusers', {
                headers: {
                    Authorization: user.token
                }
            });
            console.log(data.message.users);
            if (data.status === false)
                throw new Error(data.message);
            setLoading(false);
            setUsers(data.message.users);
        } catch (error) {
            setLoading(false);
            console.log(`[-]`, error);
        }
    };

    useEffect(() => {
        fetch_ALL_Users();
    }, []);

    /* UPDATE HANDLER  */
    const updateHandler = async (e) => {
        try {
            if (!selectedUser)
                throw new Error("SELECT USER TO UPDATE");
            if (!checkedRole)
                throw new Error("SELECT ROLE");
            if (selectedUser.userclass.toLowerCase() === 'admin')
                throw new Error("cannot update admin");

            setUpdateState(true);
            setIsUpdating(true);
            // userdata
            const user_Data = {
                userclass: checkedRole.toLowerCase()
            };
            // configurations
            const config_Data = {
                'Content-Type': 'application/json',
                "Authorization": user.token
            };
            const { data } = await axios.put(`http://127.0.0.1:8000/api/user/updateaccesslevel/${selectedUser._id}`, user_Data,
                {
                    headers: config_Data,
                });
            console.log(data);
            // if login fails
            if (!data || data.status === false)
                throw new Error(data.message);
            console.log(data);
            setErrorState({ color: 'green', message: 'Updated Sucessfull' });
            setUpdateState(false);
            setTimeout(() => {
                setIsUpdating(false);
                setOpen(false);
                setErrorState('');
            }, 2000);
        } catch (error) {
            setUpdateState(false);
            setIsUpdating(false);
            // update the notification
            setErrorState({
                color: 'red',
                message: error.message
            });
            setOpen(false);
            // after n seconds clear the error
            setTimeout(() => {
                setErrorState('');
            }, 3000);
        }
    };
    /* change the selected id */
    const logic = async (user) => {
        setSelectedUser(user);
    };

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "firstname", headerName: "Firstname", flex: 1 },
        { field: "lastname", headerName: 'LastName', flex: 1 },
        { field: "username", headerName: "Email", flex: 1 },
        {
            field: 'UpdateUser',
            headerName: "updateduser",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                    >
                        <Button
                            sx={{

                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                            onClick={(e) => {
                                handleClickOpen(row);
                            }}
                        >
                            <ManageAccountsIcon sx={{ mr: "10px" }} />
                            Change Access
                        </Button>
                        {/* MODAL TO ASK FOR UPDATION */}
                        <ModalFunc open={open} setOpen={setOpen} handleClose={handleClose}
                            colors={colors}
                            selectedRole={checkedRole}
                            setSelectedRole={setCheckedRole}
                            handleRoleChange={handleCheckboxChange}
                            handleUpdate={updateHandler}
                            isupdating={isUpdating}
                        />
                    </Box>);
            }
        },
        {
            field: "userclass",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row }) => {
                const { userclass } = row;
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            userclass === "admin"
                                ? colors.blueAccent[600]
                                : userclass === "manager"
                                    ? colors.blueAccent[700]
                                    : colors.blueAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {userclass === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {userclass === "manager" && <SecurityOutlinedIcon />}
                        {userclass === "student" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {userclass}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    return (
        <DashApp>
            <Box
                m='20px'
            >
                <Header title={"Members"} subtitle={'Managing the authorized Members'} />
                {/* to render team data */}
                <Box
                    height={'65vh'}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            // backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        // this shit is awesome
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                    m='40px 0 0 0'
                >
                    {loading ? <Loading /> :
                        <DataGrid
                            checkboxSelection
                            rows={users}
                            columns={columns}
                            getRowId={(row) => row._id}
                            slots={{
                                toolbar: GridToolbar
                            }}
                        />}
                </Box>
                {/* show notifcation message */}
                {errorState &&
                    <Notification errorState={errorState} />
                }
            </Box>
        </DashApp >
    );
};

export default ManageTeam;