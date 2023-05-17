import '../theme/css/global.css';
import {
    Box, Drawer, useMediaQuery,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/theme/assets/images/logo-full-scorekeeper.png';
import NavItem from '@/common/layout/components/NavItem';
import MenuItem from '@/models/MenuItem';

type Props = {
    open: boolean,
    onClose: any,
    menuItems: MenuItem[]
};

const Sidebar: React.FC<Props> = ({ open, onClose, menuItems }) => {
    const navigate = useNavigate();

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });

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
                    maxWidth: '200px',
                    margin: '20px auto 20px auto',
                    cursor: 'pointer',
                }}>
                <img src={Logo} alt="logo" />
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: '15px' }}>
                {menuItems.map((item: MenuItem) => (
                    <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                    />
                ))}
            </Box>
        </Box>
    );

    return (
        <>
            {
                lgUp
                    ? <Drawer
                        anchor="left"
                        open
                        PaperProps={{
                            sx: {
                                backgroundColor: 'neutral.900',
                                color: '#FFFFFF',
                                width: 280,
                            },
                        }}
                        variant="permanent"
                    >
                        {content}
                    </Drawer>
                    : <Drawer
                        anchor="left"
                        onClose={onClose}
                        open={open}
                        PaperProps={{
                            sx: {
                                backgroundColor: 'neutral.900',
                                color: '#FFFFFF',
                                width: 280,
                            },
                        }}
                        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                        variant="temporary"
                    >
                        {content}
                    </Drawer>
            }
        </>
    );
};

export default Sidebar;