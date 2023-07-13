import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';

const ProfileHelper = ({ tag, data, color }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            backgroundColor={colors.primary[400]}
            margin={2}
            borderRadius={10}
        >

            <Box
                padding={1}
                color={color}
                fontSize={32}
                display={'flex'}
            >
                <Box
                >
                    {tag} :
                </Box>
                <Box
                    color={colors.redAccent[1000]}
                    marginLeft={1}>
                    {data}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileHelper;