/* eslint-disable consistent-return */
import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Avatar,
  Badge,
  Box, Button, ButtonGroup, Container, Drawer, List, ListItemAvatar, ListItemButton, ListItemText, Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import Game from '../models/Game';
import GameService from '../services/GameService';
import Spinner from '../components/Spinner';
import Player from '../models/Player';
import UtilsService from '../services/UtilsService';

const GamePlay: React.FC = () => {
  const [currentGame, setCurrentGame] = useState() as Game | any;
  const [loading, setLoading] = useState(true) as any;
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState() as any;

  const [scoreDrawer, setScoreDrawer] = useState(false) as any;
  const [tempPlayerScore, setTempPlayerScore] = useState() as any;
  const [playerScoreStack, setPlayerScoreStack] = useState([]) as any;
  const [playerScoreStackSum, setPlayerScoreStackSum] = useState(0) as any;

  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser) as FirebaseUser;
  const language = useAppSelector((state) => state.user.language);

  const getGame = async (id: string) => {
    try {
      setLoading(true);
      const tempGame = await GameService.get(id);

      setCurrentGame(tempGame);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const updatePlayer = async () => {
    try {
      setLoading(true);
      const newPlayer = currentGame.players[selectedPlayerIndex] as Player;
      newPlayer.score.hp.unshift(tempPlayerScore);

      const tempGame = currentGame;
      tempGame.players[selectedPlayerIndex] = newPlayer;

      await GameService.update(tempGame);

      await closeDrawer();

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const openDrawer = async (index: number) => {
    try {
      setLoading(true);
      setSelectedPlayerIndex(index);

      setTempPlayerScore(currentGame.players[index].score.hp[0]);
      setScoreDrawer(true);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const closeDrawer = () => {
    try {
      setLoading(true);
      setScoreDrawer(false);
      setPlayerScoreStack([]);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const updateScore = (score: number) => {
    try {
      setLoading(true);

      const newScore = score + tempPlayerScore;
      setTempPlayerScore(newScore);

      const newPlayerScoreStack = playerScoreStack;
      newPlayerScoreStack.unshift(score);
      setPlayerScoreStack(newPlayerScoreStack);

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const undo = () => {
    try {
      setLoading(true);

      const lastScore = playerScoreStack[0];
      setTempPlayerScore(tempPlayerScore - lastScore);

      playerScoreStack.shift();
      setPlayerScoreStack(playerScoreStack);

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      setLoading(true);
      const timer = setTimeout(() => {
        if (!firebaseUser) navigate('/login');
      }, 1000);

      const gameId = params.id as string;
      getGame(gameId);

      GameService.get(gameId).then((tempGame: any) => {
        setCurrentGame(tempGame);
        setLoading(false);
      }).catch((e) => {
        setLoading(false);
        ErrorService.handleError(e, language, dispatch);
      });

      return () => {
        clearTimeout(timer);
      };
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [firebaseUser]);

  useEffect(() => {
    try {
      const tempPlayerScoreStack = playerScoreStack;
      const result = tempPlayerScoreStack.reduce((accumulator: any, current: any) => accumulator + current, 0);
      setPlayerScoreStackSum(result);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [playerScoreStack.length]);

  return (
    <>
      {
        !loading
        && <Container maxWidth='md'>
          {
            !currentGame
              && <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  bgcolor: 'secondary.main',
                  padding: '40px 10px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '800px',
                }}
              >
                <Typography component="h3" variant="h6">
                  We could not find a game with this id.
                </Typography>
              </Box>
          }
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              wrap: 'wrap',
              alignItems: 'center',
              padding: '40px 10px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Typography component="h3" variant="h6">
              {currentGame.boardgameName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                wrap: 'wrap',
                alignItems: 'center',
                padding: '40px 10px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
              }}
              margin='10px'>
              {
                currentGame.players.map((player: Player, key: number) => (
                  <List
                    sx={{
                      width: '100%',
                    }}
                    key={key}
                  >
                    <ListItemButton
                      onClick={() => openDrawer(key)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'secondary.main',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar {...UtilsService.stringAvatar(player.username)} />
                      </ListItemAvatar>
                      <ListItemText>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'left',
                            alignItems: 'flex-end',
                            gap: '5px',
                          }}
                        >
                          <Typography
                            color={UtilsService.stringToColor(player.username)}
                            component="h3" variant="h4"
                          >
                            {player.score.hp[0]}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'left',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            {
                              // eslint-disable-next-line array-callback-return
                              player.score.hp.map((value: number, hpKey: number) => {
                                if (hpKey === 8) {
                                  return (
                                    <Typography
                                      color={UtilsService.stringToColor(player.username)}
                                      component="p"
                                      fontSize='10px'
                                      key={hpKey}
                                    >
                                          ...
                                    </Typography>
                                  );
                                }
                                console.log(player.username);
                                console.log(`key : ${hpKey}`);
                                console.log(`hp array length : ${player.score.hp.length - 1}`);
                                if (hpKey === player.score.hp.length - 1 && hpKey < 8) {
                                  return (
                                    <Typography
                                      color={UtilsService.stringToColor(player.username)}
                                      component="p"
                                      fontSize='10px'
                                      key={hpKey}
                                    >
                                      {`${value}`}
                                    </Typography>
                                  );
                                }
                                if (hpKey !== 0 && hpKey < 8) {
                                  return (
                                    <Typography
                                      color={UtilsService.stringToColor(player.username)}
                                      component="p"
                                      fontSize='10px'
                                      key={hpKey}
                                    >
                                      {`${value}, `}
                                    </Typography>
                                  );
                                }
                              })
                            }

                          </Box>
                        </Box>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                ))}
            </Box>
          </Box>
        </Container>
      }
      <Spinner show={loading}/>
      <Drawer
        anchor='bottom'
        open={scoreDrawer}
        onClose={() => closeDrawer()}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            gap: '20px',
          }}
        >
          {
            selectedPlayerIndex !== undefined
            && <>
              <Badge badgeContent={playerScoreStackSum} color={playerScoreStackSum >= 0 ? 'success' : 'error'}>
                <Avatar {...UtilsService.stringAvatar(currentGame.players[selectedPlayerIndex].username)} />
              </Badge>
              <Typography component="h3" variant="h4">{tempPlayerScore}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  width: '100%',
                }}
              >
                <ButtonGroup>
                  {
                    // TODO Should be rendered depending on game rules
                  }
                  <Button onClick={() => updateScore(-10)}>-10</Button>
                  <Button onClick={() => updateScore(-5)}>-5</Button>
                  <Button onClick={() => updateScore(-1)}>-1</Button>
                  <Button onClick={() => updateScore(+1)}>+1</Button>
                  <Button onClick={() => updateScore(+5)}>+5</Button>
                  <Button onClick={() => updateScore(+10)}>+10</Button>
                </ButtonGroup>
                <Button variant="outlined" color='light' disabled={playerScoreStack.length <= 0} onClick={() => undo()}>Undo</Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  width: '100%',
                }}>
                <Button variant="outlined" color="error" onClick={() => closeDrawer()}>Cancel</Button>
                <Button variant="contained" color="success" onClick={() => updatePlayer()}>Confirm</Button>
              </Box>
            </>
          }

        </Box>
      </Drawer>
    </>
  );
};

export default GamePlay;
