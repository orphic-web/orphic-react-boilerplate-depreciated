import './Dashboard.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Button, ButtonGroup, Card, CardActions, CardContent, Chip, Container, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import GameService from '../services/GameService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser) as FirebaseUser;
  const language = useAppSelector((state) => state.user.language);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        if (!firebaseUser) navigate('/login');
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [firebaseUser]);

  const copyGame = async () => {
    try {
      console.log('copying game');
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };

  const startGame = async () => {
    try {
      const newGame = await GameService.create();
      navigate(`/game/${newGame.id}/settings`);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };

  const viewGame = async () => {
    try {
      console.log('copying game');
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };

  return (
    <Container maxWidth="sm">
      <div>
        <Button onClick={() => startGame()} >
          Start a game
        </Button>
      </div>
      <Typography component="h3" variant="h5">
        Past games
      </Typography>
      {
        // TODO : Should display all passed games
      }
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      24 août 2022
          </Typography>
          <Typography variant="h5" component="div">
      Hero Realms
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Winner : Olivier Côté
          </Typography>
          <Chip label="finished" color="success" variant="outlined" />
          <CardActions>
            <ButtonGroup>
              <Button onClick={() => copyGame()} size="small">Copy</Button>
              <Button onClick={() => viewGame()} size="small">View</Button>
            </ButtonGroup>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
