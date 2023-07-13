import React from 'react'
import DashApp from '../scenes/global/DashApp'
import Header from '../Header'
import { Box } from '@mui/material'
import BarChart from '../BarChart'

const Bar = () => {
    return (
        <DashApp>
            <Box m='20px'>
                <Header title={'Bar Chart Data'} subtitle={'Data is Everything'} />
                {/* height is essential for the barchar to be displayed */}
                <Box height={'75vh'}>
                    <BarChart />
                </Box>
            </Box>

        </DashApp>
    )
}

export default Bar