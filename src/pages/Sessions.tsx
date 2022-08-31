import { Box, ButtonGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Session from '../models/Game';

import ErrorService from '../services/ErrorService';
import SessionService from '../services/GameService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import './NotFound.css';

const Sessions: React.FC = () => {
  const [session, setSession] = useState() as Session | any;

  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.user.language);

  const retrieveSession = async () => {
    try {
      const { sessionId } = useParams();
      const sessionTemp: any = await SessionService.get(sessionId as string);
      setSession(sessionTemp);
      console.log(sessionTemp);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };

  const modifyPlayerScore = async (damage: number, index: number) => {
    try {
      const sessionTemp = session;
      sessionTemp[index].score.hp += damage;
      setSession(sessionTemp);
      console.log(sessionTemp);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      retrieveSession();
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'secondary.main',
        padding: '40px 10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px',
      }}
    >
      <Typography component="h1" variant="h5">
        {session.round[0].boardgame}
      </Typography>
      <Box>
        <Typography>{session.round[0].scores[0].username}</Typography>
        <p>{session.round[0].scores[0].hp}</p>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-15, 0)}
          >
                -15
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-10, 0)}
          >
                -10
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-5, 0)}
          >
                -5
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-1, 0)}
          >
                -1
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(1, 0)}
          >
                +1
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(5, 0)}
          >
                +5
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(10, 0)}
          >
                +10
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography>{session.round[1].scores[1].username}</Typography>
        <p>{session.round[1].scores[1].hp}</p>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-15, 1)}
          >
              -15
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-10, 1)}
          >
              -10
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-5, 1)}
          >
              -5
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(-1, 1)}
          >
              -1
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(1, 1)}
          >
              +1
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(5, 1)}
          >
              +5
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyPlayerScore(10, 1)}
          >
              +10
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Sessions;
