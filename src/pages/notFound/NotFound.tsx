import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/Hooks';
import translator from '../theme/translator.json';
import Utils from '@/utils/Utils';

const NotFound: React.FC = () => {
    const language = useAppSelector((state) => state.user.language);

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
                <Typography variant="h1">
                    {Utils.getTranslation(translator.pages.notFound.title, language)}
                </Typography>
                <Typography variant="h4">
                    {Utils.getTranslation(translator.pages.notFound.subtitle, language)}
                </Typography>
                <Typography variant="body1" align="center">
                    {Utils.getTranslation(translator.pages.notFound.abstract, language)}
                </Typography>
                <Button onClick={() => navigate('/')} variant="contained">{Utils.getTranslation(translator.pages.notFound.toDashboard, language)}</Button>
            </Box>
        </Container>
    );
};

export default NotFound;