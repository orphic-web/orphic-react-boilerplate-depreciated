import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Avatar,
  Box, Button, Container, Divider, FormControl, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Typography,
} from '@mui/material';
import {
  Field, Form, Formik,
} from 'formik';
import { Select, TextField } from 'formik-mui';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import Game from '../models/Game';
import GameService from '../services/GameService';
import Spinner from '../components/Spinner';
import Boardgames from '../models/enums/Boardgames';
import GameState from '../models/enums/GameState';
import Player from '../models/Player';

const GameSettings: React.FC = () => {
  const [currentGame, setCurrentGame] = useState() as Game | any;
  const [loading, setLoading] = useState(true) as any;

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  const firebaseUser = useAppSelector((state) => state.user.firebaseUser) as FirebaseUser;
  const language = useAppSelector((state) => state.user.language);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    let child = `${name[0]}${name[1]}${name[2]}`;

    if (name.split(' ').length >= 2 && name.split(' ')[1][0]) {
      child = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    };
  }

  const getGame = async (id: string) => {
    try {
      setLoading(true);
      const tempGame = await GameService.get(id);

      // TODO Should redirect depending on the state

      setCurrentGame(tempGame);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const addPlayer = async (formik: any) => {
    try {
      setLoading(true);
      const newPlayerCount = formik.values.players.length + 1;
      const tempPlayers = formik.values.players;

      tempPlayers.push({
        username: `Player ${newPlayerCount}`,
        score: {
          hp: 50,
        },
      });

      currentGame.playerCount = newPlayerCount;
      currentGame.players = tempPlayers;

      formik.getFieldHelpers('players').setValue(tempPlayers);

      GameService.update(currentGame);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      ErrorService.handleError(e, language, dispatch);
    }
  };

  const deletePlayer = async (formik: any, index: number) => {
    try {
      setLoading(true);
      const newPlayerCount = formik.values.players.length - 1;
      const tempPlayers = formik.values.players;

      tempPlayers.splice(index, 1);

      currentGame.playerCount = newPlayerCount;
      currentGame.players = tempPlayers;

      formik.getFieldHelpers('players').setValue(tempPlayers);

      GameService.update(currentGame);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
      setLoading(false);
    }
  };

  const startPlaying = async (values: any) => {
    try {
      setLoading(true);
      const tempGame = currentGame as Game;
      tempGame.playerCount = values.players.length;
      tempGame.players = values.players;
      tempGame.boardgameName = values.boargameName;
      tempGame.state = GameState.PLAYING;

      GameService.update(tempGame);
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
        // eslint-disable-next-line no-prototype-builtins
        if (tempGame && !tempGame.hasOwnProperty('players')) {
          const updatedGame = {
            ...tempGame,
            players: [
              {
                username: 'Player 1',
                score: {
                  hp: 50,
                },
              },
              {
                username: 'Player 2',
                score: {
                  hp: 50,
                },
              },
            ],
          };

          setCurrentGame(updatedGame);
          GameService.update(updatedGame);
        }
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

  return (

    <>
      {
        !loading
        && <div className='login__container'>
          <Container maxWidth='md'>
            <Formik
              initialValues={{
                boargameName: `${Boardgames.HERO_REALMS}`,
                players: currentGame.players,
              }}
              onSubmit={(values, { setSubmitting }) => {
                startPlaying(values);
                setSubmitting(false);
              }}

            >
              {(formikProps) => (
                <>
                  {
                    !currentGame
              && <Box
                sx={{
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
                <Typography component="h3" variant="h6">
                  We could not find a game with this id.
                </Typography>
              </Box>
                  }
                  {
                    currentGame?.state === GameState.INIT
                && <Box
                  sx={{
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
                  <Typography component="h3" variant="h6">
                  Select boardgame
                  </Typography>
                  <Box margin='20px'>
                    <Form>
                      <FormControl sx={{ minWidth: 120 }}>
                        <Box margin='10px'>
                          <Field
                            component={Select}
                            id="selected-boargame"
                            name="boargameName"
                            label="Selected boargame"
                            sx={{
                              minWidth: '200px',
                            }}
                          >
                            {
                              Object.values(Boardgames).map((boargame: string) => (
                                <MenuItem key={boargame} value={boargame}>{boargame}</MenuItem>
                              ))
                            }
                          </Field>
                        </Box>
                        <Box margin='10px'>
                          <Typography component="h3" variant="h6">
                            Edit players
                          </Typography>
                          {
                            formikProps.values?.players.map((player: Player, key: number) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '15px',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                }}
                                key={key}>
                                <List
                                  sx={{
                                    width: '100%',
                                  }}
                                >
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar {...stringAvatar(player.username)} />
                                    </ListItemAvatar>
                                    <ListItemText>
                                      <Field
                                        component={TextField}
                                        name={`players[${key}].username`}
                                        type="text"
                                        label="Username"
                                        margin='normal'
                                      />
                                      <Field
                                        component={TextField}
                                        name={`players[${key}].score.hp`}
                                        type="number"
                                        label="Initial HP"
                                        margin='normal'
                                        sx={{
                                          marginLeft: '10px',
                                        }}
                                      />

                                    </ListItemText>
                                    <DeleteForeverIcon
                                      sx={{
                                        cursor: 'pointer',
                                        marginLeft: '8px',
                                      }}
                                      onClick={() => deletePlayer(formikProps, key)}></DeleteForeverIcon>
                                  </ListItem>
                                  {
                                    key !== currentGame.playerCount - 1
                                    && <Divider variant="inset" component="li" />
                                  }
                                </List>
                              </Box>
                            ))}
                        </Box>
                      </FormControl>
                      <Box>
                        <AddCircleIcon
                          fontSize="large"
                          sx={{
                            cursor: 'pointer',
                          }}
                          onClick={() => addPlayer(formikProps)}
                        ></AddCircleIcon>
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => formikProps.submitForm() }
                      >
                      Start Playing
                      </Button>
                    </Form>
                  </Box>
                </Box>
                  }
                </>
              )}
            </Formik>
          </Container>
        </div>
      }
      <Spinner show={loading}/>
    </>
  );
};

export default GameSettings;
