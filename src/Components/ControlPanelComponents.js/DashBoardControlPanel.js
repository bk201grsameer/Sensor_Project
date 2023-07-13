import { useContext, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
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
    useTheme,
} from "@mui/material";



import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import Topbar from "../scenes/global/Topbar";
import { ColorModeContext, tokens } from "../../theme";




const data = [
    {
        name: "Home",
        icon: <HomeOutlinedIcon />,
        onClick: (e) => {
            // Add your custom logic for the Home item here
            console.log('I am HomeOutlinedIcon');
        },
    },



];

const DashBoardControlPanel = () => {
    // theme config needed
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

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
            <Topbar open={open} setOpen={setOpen} />

            {/* drawer */}
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                <Box
                    mb="25px"
                    mt={'30px'}
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={require('./user.png')}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "10px 0 0 0" }}
                        >
                            Ed Roh
                        </Typography>
                        <Typography variant="h5" color={colors.greenAccent[500]}>
                            VP Fancy Admin
                        </Typography>
                    </Box>
                </Box>
                <Divider variant="middle" textAlign="left">
                    xyz
                </Divider>
                {getList()}
                <Divider variant="middle" textAlign="left">
                    xyz
                </Divider>
                <div>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
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

export default DashBoardControlPanel