import React from 'react'
import DashApp from '../global/DashApp'
import { Box } from '@mui/material'
import Header from '../../Header'
import LineChart from '../../LineChart'

const LineData = () => {
  return (
    <DashApp>
      <Box m='20px'>
        <Header title={'Line Chart Data'} subtitle={'A Better Visualization'} />
        {/* height is essential for the barchar to be displayed */}
        <Box height={'75vh'}>
          <LineChart />
        </Box>
      </Box>

    </DashApp>)
}

export default LineData