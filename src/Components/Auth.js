import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import { IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Auth = () => {
    // theme config needed
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const pagestate = useSelector((state) => state.authState.pagestate)
    console.log(pagestate);
    const Container = styled(Box)(({ theme }) => ({
        boxSizing: 'border-box',
        height: '95vh',
        display: 'flex',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }));

    const ImageContainer = styled(Box)(({ theme }) => ({
        flex: '1 1 60%',
        background: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        boxShadow: theme.palette.mode === 'light' ? '5px 5px 10px #ccc' : 'none',
        [theme.breakpoints.down('md')]: {
            flex: 'none',
            width: '100%',
            height: '50vh',
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            flex: 'none',
            width: '100%',
            height: '50vh',
            display: 'none'
        },
        [theme.breakpoints.down('lg')]: {
            flex: 'none',
            width: '100%',
            height: '50vh',
            display: 'none'
        },
    }));

    const LoginPageContainer = styled(Box)(({ theme }) => ({
        flex: '1 1 40%',
        boxShadow: theme.palette.mode === 'light' ? '5px 5px 10px #ccc' : 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '50vh',
        },
    }));

    return (
        <Container
        >
            <ImageContainer />
            <LoginPageContainer>
                <Box
                    padding={2}
                    display={'flex'}
                    fontSize={'20px'}
                    color={theme.palette.mode === 'light' ? 'black' : colors.redAccent[1000]}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box>

                        Welcome to Bits and Bytes
                    </Box>
                    {/* dark & light theme functionalities */}
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {
                            theme.palette.mode === "dark" ? (<DarkModeOutlinedIcon />) : (<LightModeOutlinedIcon />)
                        }
                    </IconButton>
                </Box>
                {pagestate ? <LoginPage /> : <SignUp />}
            </LoginPageContainer>
        </Container >
    );
}

export default Auth;
