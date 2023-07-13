import { React, useContext } from 'react';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from '../../../theme';
import { useTheme } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setNoficationCount } from '../../../Slices/notificationSlice';




const Topbar = () => {
  // theme config needed
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get notification Count
  const notificationCount = useSelector((state) => state.notificationState.notificationCount);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      p={2}
    >
      {/* search bar */}
      <Box display={'flex'}
        backgroundColor={colors.primary[400]}
        borderRadius={'3px'}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder='search'
        />
        {/* search button */}
        <IconButton
          type='button'
          sx={{ p: 1 }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* CHANGE THEME */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {
            theme.palette.mode === "dark" ? (<DarkModeOutlinedIcon />) : (<LightModeOutlinedIcon />)
          }
        </IconButton>
        {/* NOTIFICATION */}
        <IconButton onClick={(e) => {
          dispatch(setNoficationCount(0));
          navigate('/notificationpage');
        }}>
          <Badge badgeContent={notificationCount} color={'error'}>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        {/* SETTINGS */}
        <IconButton onClick={(e) => navigate('/settings')}>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* PROFILE */}
        <IconButton onClick={(e) => navigate('/profile')}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;