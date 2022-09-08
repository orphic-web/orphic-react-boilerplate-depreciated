import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Box,
  Button, ButtonGroup, Card, CardActions, CardContent, Chip, Container, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import GameService from '../services/GameService';
import Game from '../models/Game';
import Spinner from '../components/Spinner';
import UserService from '../services/UserService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const firebaseUser = useAppSelector((state) => state.user.firebaseUser) as FirebaseUser;
  const language = useAppSelector((state) => state.user.language);

  const [games, setGames] = useState([]) as Game[] | any;
  const [loading, setLoading] = useState(true) as any;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      setLoading(true);
      const timer = setTimeout(() => {
        if (!firebaseUser) navigate('/login');
      }, 1000);

      UserService.getUserGames(10).then((response: any) => {
        setGames(response.docs);
        setLoading(false);
      }).catch((e: any) => {
        ErrorService.handleError(e, language, dispatch);
        setLoading(false);
      });
      return () => {
        clearTimeout(timer);
      };
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
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
    <>
      <Container maxWidth="sm">
        <Box sx={{
          padding: '20px',
        }}>
          <Button variant='contained' size='large' onClick={() => startGame()} >
          Start a game
          </Button>
        </Box>

        <Box sx={{
          marginTop: '40px',
        }}>
          <Typography margin="18px" component="h3" variant="h4">
        Past games
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              wrap: 'wrap',
              gap: '30px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {
              games.map((value: any, key: number) => {
                const game = value.data();
                const date = game.createdDate.toDate();
                return (
                  <Card key={key} sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {date}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {value.data().boardgameName}
                      </Typography>
                      <Chip label={value.data().state} color="success" variant="outlined" />
                      <CardActions>
                        <ButtonGroup>
                          <Button onClick={() => copyGame()} size="small">Copy</Button>
                          <Button onClick={() => viewGame()} size="small">View</Button>
                        </ButtonGroup>
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              })
            }
          </Box>
        </Box>
      </Container>
      <Spinner show={loading}/>
    </>

  );
};

export default Dashboard;
