import React from 'react';
import DashApp from '../global/DashApp';
import { Box } from '@mui/material';
import Header from '../../Header';
import PieChart from '../../PieChart';

const PieData = () => {
    return (
        <DashApp>
            <Box m='20px'>
                <Header title={'Pie Chart Data'} subtitle={'A Better Visualization Of System Poll'} />
                {/* height is essential for the barchar to be displayed */}
                <Box height={'75vh'}>
                    <PieChart />
                </Box>
            </Box>

        </DashApp>
    );
};

export default PieData;