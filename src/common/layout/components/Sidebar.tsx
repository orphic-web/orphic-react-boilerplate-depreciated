import '../../../theme/css/global.css';
import {
    Box, Button, Drawer, List,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonAddAlt1 } from '@mui/icons-material';
import Logo from '../../../theme/assets/logo-full.png';
import NavItem from './NavItem';
import MenuItem from '../../../models/MenuItem';
import AddClientPopup from '../../AddClientPopup';
import Utils from '../../../utils/Utils';
import SupportedLanguages from '../../../models/enums/SupportedLanguages';
import translator from '../../../theme/translator.json';
import { useAppSelector } from '../../../store/Hooks';

type Props = {
    open: boolean,
    onClose: any,
    menuItems: MenuItem[]
};

const Sidebar: React.FC<Props> = ({ open, onClose, menuItems }) => {
    const navigate = useNavigate();

    const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
    const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

    const handleAddClient = () => {
        setAddClientDialogOpen(true);
    };

    useEffect(() => {
        if (open) {
            onClose?.();
        }
    }, []);

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Box
                onClick={() => navigate('/')}
                sx={{
                    maxWidth: '150px',
                    margin: '20px auto 20px auto',
                    cursor: 'pointer',
                }}>
                <img src={Logo} alt="logo" />
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: '15px', bgcolor: 'background.paper' }}>
                <List onClick={onClose}>
                    {menuItems.map((item: MenuItem, index: number) => (
                        <NavItem
                            key={item.title.fr}
                            icon={item.icon}
                            href={item.href}
                            title={item.title[language]}
                        />
                    ))}
                </List>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                }}>
                <Button
                    variant="contained"
                    size='small'
                    color='secondary'
                    startIcon={<PersonAddAlt1 height="2px" />}
                    onClick={handleAddClient}
                    sx={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        padding: 2,
                    }}
                >{Utils.getTranslation(language, translator.components.nav.addClientContact)}</Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                anchor="left"
                onClose={onClose}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280,
                    },
                }}
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar + 100,
                    display: { xs: 'flex', lg: 'none' },
                }}
                variant="temporary"
            >
                {content}

            </Drawer>
            <AddClientPopup open={addClientDialogOpen} onClose={() => setAddClientDialogOpen(false)} />
        </>
    );
};

export default Sidebar;
