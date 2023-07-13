import React from 'react';
import Auth from './Components/Auth';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Dashboard from './Components/scenes/dashboard/Dashboard';
import DashApp from './Components/scenes/global/DashApp';
import { useSelector } from 'react-redux';

import Invoices from './Components/scenes/invoices/Invoices';
import Form from './Components/scenes/form/Form';
import PieData from './Components/scenes/pie/PieData';
import LineData from './Components/scenes/line/LineData';
import Faq from './Components/scenes/faq/Faq';
import Calander from './Components/scenes/calander/Calander';
import GeoGraphy from './Components/scenes/geography/GeoGraphy';
import ManageTeam from './Components/scenes/team/ManageTeam';
import Contact from './Components/scenes/contacts/Contact';
import Bar from './Components/bar/Bar';
import { SocketProvider } from './Context/SocketProvider';
import Profile from './Components/Profile/Profile';
import SettingsComponent from './Components/SettingComponents/SettingsComponent';
import NotificationPage from './Components/Notifications/NotificationPage';
import LineGraph from './Components/scenes/line/LineGraph';


const App = () => {
    const [theme, colorMode] = useMode();



    return (
        //<ControlPanel />
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* making socket globally accessible */}
                <SocketProvider>
                    <div className='app'>
                        <main className='content'>
                            <Routes>
                                <Route exact path="/" element={<Auth />} />
                                <Route exact path="/team" element={<ManageTeam />} />
                                {/* this below is the core remove it after done testing  */}
                                <Route exact path="dashapp" element={<DashApp />} />
                                <Route exact path="dashboard" element={<Dashboard />} />
                                {/* <Route path="/contacts" element={<Contact />} />
                                <Route path="/invoices" element={<Invoices />} /> */}
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/form" element={<Form />} />
                                <Route path="/pie" element={<PieData />} />
                                <Route path="/line" element={<LineData />} />
                                <Route path="/faq" element={<Faq />} />
                                <Route path="/calendar" element={<Calander />} />
                                <Route path="/geography" element={<GeoGraphy />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/settings" element={<SettingsComponent />} />
                                <Route path="/alldataline" element={<LineGraph />} />
                                <Route path="/notificationpage" element={<NotificationPage />} />

                            </Routes>
                        </main>
                    </div>
                </SocketProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>


    );
};

export default App;