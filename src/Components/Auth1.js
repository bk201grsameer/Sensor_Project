import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';

const Auth1 = () => {
    const pagestate = useSelector((state) => state.authState.pagestate)

    const Container = styled(Box)(({ theme }) => ({
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }));

    const LoginPageContainer = styled(Box)(({ theme }) => ({
        flex: '1 1 40%',
        background: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '5px 5px 10px #ccc',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '50vh',
        },
    }));

    return (
        <Container>
            <LoginPageContainer>
                {pagestate ? <LoginPage /> : <SignUp />}
            </LoginPageContainer>
        </Container>
    );
}

export default Auth1;
