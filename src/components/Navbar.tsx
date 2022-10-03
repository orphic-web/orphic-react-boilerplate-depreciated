import '../theme/css/global.css';
import {
  AppBar, Badge, Box, IconButton, ListItemIcon, MenuItem, MenuList, Popover, styled, Toolbar, Tooltip, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Utils from '../utils/Utils';
import User from '../models/User';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import translator from '../theme/translator.json';
import SupportedLanguages from '../models/enums/SupportedLanguages';

import Bell from '../theme/assets/icons/Bell';
import ErrorService from '../services/ErrorService';
import Spinner from './Spinner';
import UserService from '../services/UserService';

type Props = {
  onSidebarOpen: any,
  title: string
};

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const Navbar: React.FC<Props> = ({ onSidebarOpen, title }) => {
  const user = useAppSelector((state) => state.user.user) as User;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const settingsRef = useRef(null);

  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    try {
      setLoading(true);
      await UserService.logout();
      setLoading(false);
      navigate('/login');
    } catch (e: any) {
      ErrorService.handleError(e, dispatch, language);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5">{title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={Utils.getTranslation(language, translator.components.appBar.notification)}>
            <IconButton
              onClick={() => navigate('/notifications')}
              sx={{ ml: 1, mr: '10px' }}
            >
              <Badge
                badgeContent="8"
                color="primary"
              >
                <Bell fontSize='small'/>
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{ ml: 1, mr: '10px' }}
          >
            <MoreVertIcon fontSize='medium'/>
          </IconButton>
        </Toolbar>
      </NavbarRoot>
      <Popover
        anchorEl={settingsRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        onClose={() => setOpenAccountPopover(false)}
        open={openAccountPopover}
        PaperProps={{
          sx: { width: '300px' },
        }}
      >
        <Box
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="overline">
            {Utils.getTranslation(language, translator.components.appBar.accountPopover.title)}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user?.email}
          </Typography>
        </Box>
        <MenuList
          sx={{
            '& > *': {
              '&:first-of-type': {
                borderTopColor: 'divider',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
              },
              padding: '12px 16px',
            },
          }}
        >
          <MenuItem onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {Utils.getTranslation(language, translator.components.appBar.accountPopover.settings)}
          </MenuItem>
          <MenuItem onClick={() => signout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            {Utils.getTranslation(language, translator.components.appBar.accountPopover.signOut)}
          </MenuItem>
        </MenuList>
      </Popover>
      <Spinner show={loading}/>
    </>
  );
};

export default Navbar;
