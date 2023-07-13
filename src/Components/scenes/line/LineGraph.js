import React from 'react';
import DashApp from '../global/DashApp';
import Header from '../../Header';
import { Box } from '@mui/material';
import AllChart from './AllChart';

const LineGraph = () => {
    return (
        <DashApp>
            <Box m='20px'>
                <Header title={'Data'} subtitle={'Your data'} />
                <Box height='75vh'>
                    <AllChart />
                </Box>
            </Box>
        </DashApp>
    );
};

export default LineGraph;