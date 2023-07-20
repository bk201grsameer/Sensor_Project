import React from 'react';
import Header from '../../Header';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import DashApp from '../global/DashApp';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import TrafficIcon from "@mui/icons-material/Traffic";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from '../../LineChart';
import StatBox from '../../../dashboardcomponents/StatBox';
import { tokens } from '../../../theme';
import { mockTransactions } from '../../../data/mockData';
import ProgressCircle from '../../../dashboardcomponents/ProgressCircle';
import BarChart from '../../BarChart';
import PieChart from '../../PieChart';
import { SocketState } from '../../../Context/SocketProvider';
import { useEffect } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useState } from 'react';
import DashBoardLineChart from '../line/DashBoardLineChart';
import Loading from '../../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setNoficationCount } from '../../../Slices/notificationSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // the user config
    const data = useSelector((state) => state.authState.user);
    const user = data.message;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [temperature, setTempurature] = useState(0);
    const [distance, setDistance] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [emailCount, setEmailCount] = useState(0);
    const [recentMeasureMents, setRecentMeasurements] = useState([]);
    const { socket } = SocketState();
    const navigate = useNavigate();
    // get notification Count
    const notificationCount = useSelector((state) => state.notificationState.notificationCount);
    const dispatch = useDispatch();

    const fetchTodayEmailCount = async (userToken) => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/notifications/getemailcount', {
                headers: {
                    Authorization: userToken,
                },
            });
            if (data.status === false) {
                throw new Error(data.message);
            }
            return data.message;
        } catch (error) {
            console.log(`[+]`, error);
            return 0;
        }
    };

    // socket logic
    useEffect(() => {
        if (!user) {
            return navigate('/');
        }
        // temperature data
        const temperature_Data = (data) => {
            // console.log(data);
            if (data)
                setTempurature(data.temperature);
        };
        // distance data
        const distance_data = (data) => {
            if (data)
                setDistance(data.distance);
        };
        // humidity
        const humid_data = (data) => {
            if (data)
                setHumidity(data.humidity);
        };
        // email data
        const email_data = (data) => {
            if (data)
                setEmailCount(data.data);
        };

        // notification data
        const notification_Data_Listener = (data) => {
            if (data) {
                dispatch(setNoficationCount(notificationCount + 1));
            }
        };

        // recent measurement data
        const recent_measurement_data = (data) => {
            if (data)
                setRecentMeasurements(data);
        };
        // attach listeners
        /* Inside fetchData, we use Promise.all to await the completion of two asynchronous operations simultaneously: fetchTodayEmailCount(user.token) and a promise that resolves when the socket connection is established. This allows us to fetch the email count and set up the socket event listeners in parallel. */
        const fetchData = async () => {
            if (!user) {
                return navigate('/');
            }
            const [emailCount, socketData] = await Promise.all([
                fetchTodayEmailCount(user.token),
                new Promise((resolve) => {
                    socket.on('distance_event', distance_data);
                    socket.on('temperature_event', temperature_Data);
                    socket.on('humidity_event', humid_data);
                    socket.on('email_event', email_data);
                    socket.on('recent_measurement_event', recent_measurement_data);
                    socket.on('notification_event', notification_Data_Listener);
                    resolve();
                }),
            ]);

            setEmailCount(emailCount);
            // Handle other socket data...

            return () => {
                // Detach listeners
                socket.off('temperature_event', temperature_Data);
                socket.off('distance_event', distance_data);
                socket.off('humidity_event', humid_data);
                socket.off('email_event', email_data);
                socket.off('recent_measurement_event', recent_measurement_data);
                socket.off('notification_event', notification_Data_Listener);
            };
        };

        fetchData();
    }, [user, navigate, dispatch, notificationCount]);
    // progress between certain range ex 0 0.1 ...0.9 1
    const progressConverter = (value, minval, maxval) => {
        const progressval = (value - minval) / (maxval - minval);
        return progressval;
    };
    // reverse scale
    function reverseScale(value, min, max) {
        var scaledValue = (value - min) / (max - min);
        var reversedValue = 1 - scaledValue;
        return reversedValue;
    }
    return (
        <DashApp>
            <Box margin={'20px'}>
                <Box display="flex" justifyContent="space-between" alignItems="center"
                    padding={'10px'}>
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                    <Box>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                    </Box>
                </Box>

                {/* Grids */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    {/* ROW 1 */}
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={emailCount}
                            subtitle="Emails Sent"
                            progress="0.75"
                            // increase="+14%"
                            icon={
                                <EmailIcon
                                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={temperature + ' °C'}
                            subtitle="Temperature"
                            progress={progressConverter(temperature, 0, 100)}
                            // increase="+21%"
                            icon={
                                <DeviceThermostatIcon
                                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={humidity + ' %'}
                            subtitle="Humidity"
                            progress="0.20"
                            // increase="+5%"
                            icon={
                                <WaterDropIcon
                                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="1,325,134"
                            subtitle="Traffic Received"
                            progress="0.80"
                            increase="+43%"
                            icon={
                                <TrafficIcon
                                    sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
                                />
                            }
                        />
                    </Box>

                    {/* ROW 2 */}
                    <Box
                        gridColumn="span 8"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex "
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography
                                    variant="h3"
                                    fontWeight="600"
                                    color={colors.grey[100]}
                                >
                                    Intrusion Detection
                                </Typography>
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color={colors.blueAccent[400]}
                                >
                                    Top Readings
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlinedIcon
                                        sx={{ fontSize: "26px", color: colors.blueAccent[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" m="-20px 0 0 0">
                            <DashBoardLineChart isDashboard={true} />
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        overflow="auto"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                Recent Measurements
                            </Typography>
                        </Box>

                        {recentMeasureMents.length !== 0 ? recentMeasureMents.map((meas, i) => (
                            <Box
                                key={`${meas.sensorId}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="15px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.blueAccent[400]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {meas.sensorId}
                                    </Typography>
                                    <Typography color={colors.grey[100]}>
                                        {meas.sensortype}
                                    </Typography>
                                </Box>
                                <Box color={colors.grey[100]}>{meas.date}</Box>
                                <Box
                                    backgroundColor={colors.blueAccent[400]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    {meas.value}
                                </Box>
                            </Box>
                        ))
                            : <Loading />
                        }
                    </Box>

                    {/* ROW 3 */}
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                    >
                        <Typography variant="h5" fontWeight="600">
                            Danger Notifying System
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mt="25px"
                        >
                            <ProgressCircle size="125" progress={reverseScale(distance, 0, 200)} />
                            <Typography
                                variant="h5"
                                color={distance < 20 ? colors.redAccent[500] : colors.blueAccent[400]}
                                sx={{ mt: "15px" }}
                            >
                                {distance + ' Cm'}
                            </Typography>
                            <Typography
                                color={distance < 20 ? colors.redAccent[500] : colors.blueAccent[400]}
                            >Closeness Measurements</Typography>
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                        >
                            Sales Quantity
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <BarChart isDashboard={true} />
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        padding="30px"
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ marginBottom: "15px" }}
                        >
                            Poll Data
                        </Typography>
                        <Box height="250px" mt="-20px">
                            <PieChart isDashboard={true} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DashApp >
    );
};

export default Dashboard;