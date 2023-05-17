import '../Layout.css';
import '../../../theme/css/global.css';
import {
    AppBar, Box, Button, Container, Divider, IconButton, ListItemIcon, MenuItem, MenuList, Popover, styled, Toolbar, Tooltip, Typography,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AddOutlined, CalendarMonth, FormatListBulleted, Groups3, HomeRepairService, Person, PersonAddAlt1, Star, UploadFile, Help, ArrowForward, AdminPanelSettings,
} from '@mui/icons-material';
import {
    useEffect,
    useRef, useState,
} from 'react';
import { useNavigate, NavLink, useSearchParams } from 'react-router-dom';
import PlanWidget from '../../PlanWidget';
import Logo from '../../../theme/assets/logo-full.png';
import Utils from '../../../utils/Utils';
import User from '../../../models/User';
import { useAppDispatch, useAppSelector } from '../../../store/Hooks';
import translator from '../../../theme/translator.json';
import SupportedLanguages from '../../../models/enums/SupportedLanguages';
import Spinner from '../../Spinner';
import UserService from '../../../services/UserService';
import AddClientPopup from '../../AddClientPopup';
import AlertUtils from '../../../utils/AlertUtil';
import ImportPopup from '../../importPopup/ImportPopup';
import TutorialPopup from '../../tutorialPopup/TutorialPopup';

type Props = {
    title: string,
    onSidebarOpen: any,
};

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

const Navbar: React.FC<Props> = ({ onSidebarOpen, title }) => {
    const user = useAppSelector((state) => state.user.user) as User;
    const language = useAppSelector((state) => state.user.language) as SupportedLanguages;
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const settingsRef = useRef(null);
    const actionBtnMenuRef = useRef(null);

    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const [openTutorialPopover, setOpenTutorialPopover] = useState(false);
    const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [openActionBtnPopover, setOpenActionBtnPopover] = useState(false);
    const [loading, setLoading] = useState(false);

    const signout = async () => {
        try {
            setLoading(true);
            await UserService.logout();
            setLoading(false);
            navigate('/login');
        } catch (e: any) {
            setLoading(false);
            console.error(e);
            AlertUtils.createErrorAlert(Utils.getTranslation(language, translator.errorMessages.general.unknown), dispatch);
        }
    };

    const handleAddClient = () => {
        setAddClientDialogOpen(true);
    };

    useEffect(() => {
        const fromParam = searchParams.get('from');
        switch (fromParam) {
            case 'accountCreated':
                setOpenTutorialPopover(true);
                break;
            default:
                break;
        }
    }, []);

    return (
        <>
            <NavbarRoot>
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            minHeight: 64,
                            left: 0,
                        }}
                    >
                        <Box
                            className='navbar-logo'
                            onClick={() => navigate('/')}
                            sx={{
                                maxWidth: '120px',
                                margin: '10px 10px 5px',
                                cursor: 'pointer',
                                display: { xs: 'none', md: 'block' },
                            }}>
                            <img src={Logo} alt="logo" />
                        </Box>
                        <IconButton
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            onClick={onSidebarOpen}>
                            <MenuIcon fontSize="small" />
                        </IconButton>
                        <Box
                            sx={{
                                ml: '10px',
                                display: { xs: 'block', md: 'none' },
                            }}>
                            <Typography color="primary"><strong>{title}</strong></Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box
                            sx={{
                                fontSize: 15,
                                fontWeight: 600,
                                display: { xs: 'none', md: 'flex' },
                                alignSelf: 'stretch',
                                alignItems: 'center',
                            }}
                        >
                            <NavLink
                                to="/"
                                className="desktop-nav-link"
                                style={({ isActive }) => (isActive ? { background: '#F1F1E6', color: '#F55C47' } : { color: '#16213E' })
                                }
                            >
                                <CalendarMonth fontSize="small" />
                                {Utils.getTranslation(language, translator.components.nav.suivis)}
                            </NavLink>
                            <Divider orientation='vertical' variant="middle" flexItem
                                sx={{
                                    borderWidth: '1px', borderColor: '#16213E', borderRadius: '4px', ml: '5px', mr: '5px',
                                }} />
                            <NavLink
                                to="/clients/listes"
                                className="desktop-nav-link"
                                style={({ isActive }) => (isActive ? { background: '#F1F1E6', color: '#F55C47' } : { color: '#16213E' })
                                }
                            >
                                <FormatListBulleted fontSize="small" />
                                {Utils.getTranslation(language, translator.components.nav.banqueDeContacts)}
                            </NavLink>
                            <ArrowForward fontSize="small"
                                sx={{
                                    color: 'secondary.main', ml: '-10px', mr: '-10px', position: 'relative', zIndex: '2',
                                }} />
                            <NavLink
                                to="/clients/prospect"
                                className="desktop-nav-link"
                                style={({ isActive }) => (isActive ? { background: '#F1F1E6', color: '#F55C47' } : { color: '#16213E' })
                                }
                                end
                            >
                                <Groups3 fontSize="small" />
                                {Utils.getTranslation(language, translator.components.nav.prospects)}
                            </NavLink>
                            <ArrowForward fontSize="small"
                                sx={{
                                    color: 'secondary.main', ml: '-10px', mr: '-10px', position: 'relative', zIndex: '2',
                                }} />
                            <NavLink
                                to="/clients"
                                className="desktop-nav-link"
                                style={({ isActive }) => (isActive ? { background: '#F1F1E6', color: '#F55C47' } : { color: '#16213E' })
                                }
                                end
                            >
                                <Person fontSize="small" />
                                {Utils.getTranslation(language, translator.components.nav.clients)}
                            </NavLink>
                            <ArrowForward fontSize="small"
                                sx={{
                                    color: 'secondary.main', ml: '-10px', mr: '-10px', position: 'relative', zIndex: '2',
                                }} />
                            <NavLink
                                to="/clients/proposition"
                                className="desktop-nav-link"
                                style={({ isActive }) => (isActive ? { background: '#F1F1E6', color: '#F55C47' } : { color: '#16213E' })
                                }
                            >
                                <Star fontSize="small" />
                                {Utils.getTranslation(language, translator.components.nav.propositions)}
                            </NavLink>
                        </Box>
                        <Box
                            sx={{ flexGrow: 1 }}
                        />

                        <Box sx={{ width: 12 }} />
                        <Button
                            sx={{ display: { md: 'flex' } }}
                            ref={actionBtnMenuRef}
                            variant="contained"
                            onClick={() => setOpenActionBtnPopover(!openActionBtnPopover)}
                            endIcon={<AddOutlined />}
                            color="secondary"
                        >
                            {Utils.getTranslation(language, translator.general.nouveau)}
                        </Button>
                        <Popover
                            open={openActionBtnPopover}
                            onClose={() => setOpenActionBtnPopover(false)}
                            anchorEl={actionBtnMenuRef.current}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <Button
                                    variant="text"
                                    startIcon={<PersonAddAlt1 />}
                                    onClick={() => {
                                        handleAddClient();
                                        setOpenActionBtnPopover(false);
                                    }}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}
                                    color="primary"
                                >{Utils.getTranslation(language, translator.components.nav.clientContact)}</Button>
                                <Button
                                    variant="text"
                                    startIcon={<UploadFile />}
                                    onClick={() => {
                                        setImportDialogOpen(true);
                                        setOpenActionBtnPopover(false);
                                    }}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}>
                                    {Utils.getTranslation(language, translator.components.importPopup.import)}
                                </Button>
                            </Box>
                        </Popover>
                        <Box sx={{ ml: 2 }}>
                            <Tooltip title="Compte">
                                <IconButton
                                    onClick={() => setOpenAccountPopover(true)}
                                    ref={settingsRef}
                                >
                                    <MoreVertIcon fontSize='medium' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Tooltip title="Aide">
                            <IconButton
                                onClick={() => setOpenTutorialPopover(true)}
                                ref={settingsRef}
                            >
                                <Help fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Container>
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
                    <PlanWidget />
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
                    {user && user.isSuperAdmin && <MenuItem onClick={() => navigate('/superadmin')}>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        Administrateur
                    </MenuItem>}
                    <MenuItem onClick={() => navigate('/boite-outils')}>
                        <ListItemIcon>
                            <HomeRepairService />
                        </ListItemIcon>
                        {Utils.getTranslation(language, translator.components.nav.tools)}
                    </MenuItem>
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
            <Spinner show={loading} />
            <TutorialPopup open={openTutorialPopover} onClose={() => setOpenTutorialPopover(false)} />
            <AddClientPopup open={addClientDialogOpen} onClose={() => setAddClientDialogOpen(false)} />
            <ImportPopup open={importDialogOpen} onClose={() => setImportDialogOpen(false)} />
        </>
    );
};

export default Navbar;