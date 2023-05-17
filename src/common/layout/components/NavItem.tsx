import '@/theme/assets/css/global.css';
import {
    ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    href: string,
    icon: any,
    title: string,
};

const NavItem: React.FC<Props> = ({ href, icon, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = href ? (location.pathname === href) : false;

    return (
        <>
            <ListItem
                disableGutters
                sx={{
                    display: 'flex',
                    mb: 0.5,
                    py: 0,
                    px: 2,
                }}
            >
                <ListItemButton
                    selected={active}
                    onClick={() => navigate(href, { state: { title } })}
                    sx={{
                        borderRadius: '3px',
                    }}
                >
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default NavItem;
