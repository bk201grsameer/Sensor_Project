import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
import LogoutIcon from '@mui/icons-material/Logout';
import { tokens } from '../../../theme';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Slices/authSlice";

// to do create a different item component
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => {
                setSelected(title);
                console.log({ to: to });
            }}
            icon={icon}
            component={<Link to={to} />}
        >
            <Box>
                <Box>
                    {title}
                </Box>
            </Box>

        </MenuItem>
    );
};




const MySideBarPro = () => {
    // the user config
    const data = useSelector((state) => state.authState.user);
    const user = data.message.user;
    // console.log({ user });
    const dispatch = useDispatch();

    // navigation config
    const navigate = useNavigate();


    // theme config
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // toggle
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    // menuItemStyles VVIP 
    const menuItemStyles = {
        button: {
            '&:hover':
            {
                // this will have the essential hover effect 
                backgroundColor: theme.palette.mode === 'light' ? colors.primary[400] : colors.blueAccent[600],
                color: theme.palette.mode === 'light' ? 'white' : 'white',
            },
        },
    };


    // function to handle logout
    const handle_Logout = (e) => {
        try {
            // remove the user
            dispatch(setUser(''));
            //navigate to the home page
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Box
            sx={{ height: '100vh', overflowY: 'auto' }}
        >
            <Sidebar
                style={{ height: "100vh" }}
                // to do collapse feature
                // collapsed={isCollapsed}
                backgroundColor="none"
                transitionDuration={100}
            >
                <Menu
                    iconShape="square"
                    menuItemStyles={menuItemStyles}
                >
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        // // to do collapse feature
                        // onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    {/* dynamically update user's firstname data */}
                                    {user.firstname}
                                </Typography>

                                <IconButton >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* profile pic */}
                    {!isCollapsed && (

                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    // user dynamic avatar
                                    src={user.avatar}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            {/* user name and title */}
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user.isAdmin}
                                </Typography>
                                <Typography variant="h6" color={colors.blueAccent[400]}>
                                    {user.username}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* /dashboard */}
                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* data divider */}
                        {user.isAdmin === 'admin' && <>
                            <Divider variant="middle" textAlign="left" sx={{ color: colors.blueAccent[400] }} >
                                Manage
                            </Divider>
                            {/* /team */}
                            <Item
                                title="Manage Team"
                                to="/team"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            {/* /contact */}
                            {/* <Item
                                title="Contacts Information"
                                to="/contacts"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> */}
                            {/* /invoices */}
                            {/* <Item
                                title="Invoices Balances"
                                to="/invoices"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> */}
                        </>}

                        {/* Page  divider */}
                        <Divider variant="middle" textAlign="left" sx={{ color: colors.blueAccent[400] }} >
                            Page
                        </Divider>
                        {/* /form */}
                        {user.isAdmin === 'admin' && <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />}
                        {/* calender */}
                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* faq page */}
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* Chart divider */}
                        <Divider variant="middle" textAlign="left" sx={{ color: colors.blueAccent[400] }} >
                            Chart
                        </Divider>
                        {/* /barchart */}
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* /pie */}
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* /line chart */}
                        <Item
                            title="Line Chart"
                            to="/alldataline"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* all line data */}
                        {/* /line chart */}
                        <Item
                            title="Intrusion Visualization"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Divider variant="middle" textAlign="left" sx={{ color: colors.blueAccent[400] }} >
                            Logout
                        </Divider>
                        {/* Logout */}
                        <MenuItem
                            onClick={handle_Logout}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width={200}
                                height={50}
                                p={1}
                            >
                                <Box>
                                    Logout
                                </Box>
                                <Box>
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </MenuItem>
                    </Box>
                </Menu>
            </Sidebar>

        </Box >
    );
};

export default MySideBarPro;