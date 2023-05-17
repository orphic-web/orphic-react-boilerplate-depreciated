import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    maxWidth: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    gap: '15px',
                }}
            >
                <Typography variant="h1">404</Typography>
                <Typography variant="h4">Page not found</Typography>
                <Typography variant="body1" align="center">The page you are looking for was moved, removed, renamed or might never existed.</Typography>
                <Button onClick={() => navigate('/')} variant="contained">Go to dashboard</Button>
            </Box>
        </Container>
    );
};

export default NotFound;