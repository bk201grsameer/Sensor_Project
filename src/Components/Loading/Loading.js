import React from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
const Loading = ({ loadingmsg = 'Loading Data....' }) => {
    return (
        <Box
            mt={5}
            ml={4}
            display={'flex'}
            alignItems={'center'}
        >
            <Typography variant='h3'>{loadingmsg}</Typography>
            <Skeleton variant='circular' width={60} height={60}></Skeleton>
        </Box>
    )
}

export default Loading