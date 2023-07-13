import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon,
    DraftsOutlined as DraftsOutlinedIcon,
    HomeOutlined as HomeOutlinedIcon,
    InboxOutlined as InboxOutlinedIcon,
    MailOutline as MailOutlineIcon,
    ReceiptOutlined as ReceiptOutlinedIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,

} from "@mui/icons-material";

import { styled } from '@mui/material/styles';

// Custom styled components
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    fontSize: '2.5rem',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '1.2rem',
    padding: '10px 20px',
    marginLeft: '10px',
}));


const data = [
    {
        name: "Home",
        icon: <HomeOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am HomeOutlinedIcon');
        },
    },
    {
        name: "Inbox",
        icon: <InboxOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am InboxOutlinedIcon');
        },
    },
    {
        name: "Outbox",
        icon: <CheckBoxOutlineBlankOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am CheckBoxOutlineBlankOutlinedIcon');
        },
    },
    {
        name: "Sent mail",
        icon: <MailOutlineIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am MailOutlineIcon');
        },
    },
    {
        name: "Draft",
        icon: <DraftsOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am DraftsOutlinedIcon');
        },
    },
    {
        name: "Trash",
        icon: <ReceiptOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am ReceiptOutlinedIcon');
        },
    },
];

const ControlPanelSideDrawer = () => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const handleAvatarClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            <List>
                {data.map((item, index) => (
                    <ListItem key={index} onClick={item.onClick}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <Box
            sx={{}}>

            {/* dashboard nav */}
            <Box sx={{ padding: '20px 20px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5">DashBoard</Typography>

                    <Box sx={{ flexGrow: 1 }} /> {/* Empty box to push elements to the right */}

                    <TextField variant="standard" placeholder="Search" sx={{ marginRight: '10px' }} />
                    <Button variant="text" sx={{ color: 'black' }}>Search</Button>

                    <Avatar sx={{ marginLeft: '10px' }} alt="Profile" src="/path-to-profile-image.jpg" onClick={handleAvatarClick} />
                    <Avatar sx={{ marginLeft: '10px' }} alt="Notification" src="/path-to-notification-image.jpg" />
                    <IconButton aria-label="menu" sx={{ fontSize: '2.5rem' }} onClick={() => setOpen(true)} >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* drawer */}
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                {getList()}
            </Drawer>

            {/* Modal */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Modal Title
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Modal Content
                    </Typography>
                </Box>
            </Modal>


        </Box>
    )
}

export default ControlPanelSideDrawer