import '@/theme/assets/css/global.css';
import {
    Box, styled,
} from '@mui/material';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Sidebar from '@/common/layout/components/Sidebar';
import Navbar from '@/common/layout/components/Navbar';
import MenuItem from '@/models/MenuItem';
import AlertsContainer from '@/common/layout/components/alertsContainer/AlertsContainer';

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280,
    },
}));

type Props = {
    children?: React.ReactNode
    title: string
};

const Layout: React.FC<Props> = ({ children, title }) => {

    const sidebarMenuItems = [
        {
            href: '/',
            icon: (<HomeIcon fontSize="small" />),
            title: "Dashboard",
        },
    ] as MenuItem[];

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <LayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
                <AlertsContainer />
            </LayoutRoot>
            <Navbar title={title} onSidebarOpen={() => setSidebarOpen(true)} />
            <Sidebar
                menuItems={sidebarMenuItems}
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </>
    );
};

export default Layout;