import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Button, Card, Container, Grid, IconButton, Tab, Tabs, Tooltip, Typography, useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwipeableViews from 'react-swipeable-views';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';
import { useAppDispatch } from '../store/Hooks';

import AlertUtils from '../utils/AlertUtil';
import TabPanel from '../components/TabPanel';
import SearchBar from '../components/SearchBar';
import GameVisibility from '../models/enums/GameVisibility';
import GameService from '../services/GameService';
import { auth } from '../FirebaseConfig';
import GameSpecifications from '../models/GameSpecifications';
import GameOrderType from '../models/enums/GameOrderType';
import Score from '../models/Score';
import ScoreSpecifications from '../models/ScoreSpecifications';
import ErrorService from '../services/ErrorService';
import QueryArg from '../models/QueryArg';
import Game from '../models/Game';

const Games: React.FC = () => {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [privateGames, setPrivateGames] = useState<Game[]>([]);
  const [pendingGames, setPendingGames] = useState<Game[]>([]);
  const [publicGames, setPublicGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const filterData = (query: any, data: any) => {
    if (!query) {
      return data;
    }
    return data.filter((d: any) => d.name?.includes(query));
  };

  const handleSetFilteredGames = async (tabPos: number, query: string) => {
    if (tabPos === 0) {
      // Set the content tab to filtered public games
      const tempFilteredGames = await filterData(query, publicGames);
      setFilteredGames(tempFilteredGames);
    } else if (tabPos === 1) {
      // Set the content tab to filtered private games
      const tempFilteredGames = await filterData(query, privateGames);
      setFilteredGames(tempFilteredGames);
    } else if (tabPos === 2) {
      // Set the content tab to filtered pending games
      const tempPendingGames = await filterData(query, pendingGames);
      setFilteredGames(tempPendingGames);
    }
  };

  // Triggered with tabs header
  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    handleSetFilteredGames(newValue, searchQuery);
  };

  // Triggered with tab content
  const handleChangeIndex = async (index: number) => {
    setTabIndex(index);
    handleSetFilteredGames(index, searchQuery);
  };

  // Triggered search bar
  const handleChangeSearchQuery = async (target: any) => {
    setSearchQuery(target.value);
    handleSetFilteredGames(tabIndex, target.value);
  };

  const createGame = async () => {
    setLoading(true);
    if (auth.currentUser) {
      const gameSpec = {
        maxTeams: 10,
        teamMaxSize: 2,
        teamMinSize: 2,
        orderType: GameOrderType.PLAYER,
      } as GameSpecifications;

      const scoreSpec = {
        teamScore: [{
          name: 'HP',
          value: 50,
          minValue: 0,
          maxValue: 100000,
          defaultValue: 50,
          scoreIntervals: [-5, -2, -1, 1, 2, 5],
        }] as Score[],
        playerScore: [{
          name: 'HP',
          value: 50,
          minValue: 0,
          maxValue: 100000,
          defaultValue: 50,
          scoreIntervals: [-5, -2, -1, 1, 2, 5],
        }] as Score[],
      } as ScoreSpecifications;

      await GameService.create(
        'Ok',
        auth.currentUser.uid,
        GameVisibility.PENDING,
        new Date(),
        gameSpec,
        scoreSpec,
        'asdasdsd',
      );
    }
    setLoading(false);
  };

  const getPublicGames = async (queryArgs: QueryArg[]) => {
    try {
      setLoading(true);
      const publicGamesTemp = await GameService.getMultiple(queryArgs);
      setPublicGames(publicGamesTemp);

      if (tabIndex === 0) {
        const tempFilteredGames = await filterData(searchQuery, publicGamesTemp);
        setFilteredGames(tempFilteredGames);
      }

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  const getPrivateGames = async (queryArgs: QueryArg[]) => {
    try {
      setLoading(true);
      const privateGamesTemp = await GameService.getMultiple(queryArgs);
      setPrivateGames(privateGamesTemp);

      if (tabIndex === 1) {
        const tempFilteredGames = await filterData(searchQuery, privateGamesTemp);
        setFilteredGames(tempFilteredGames);
      }

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  const getPendingGames = async (queryArgs: QueryArg[]) => {
    try {
      setLoading(true);
      const pendingGamesTemp = await GameService.getMultiple(queryArgs);
      setPendingGames(pendingGamesTemp);

      if (tabIndex === 2) {
        const tempFilteredGames = await filterData(searchQuery, pendingGamesTemp);
        setFilteredGames(tempFilteredGames);
      }

      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  const renderFilteredGames = () => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: 0,
    }}>
      {filteredGames.map((game: any) => (
        <Card
          key={game.id}
          sx={{
            padding: '15px',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography>{game.name}</Typography>
            <Box>
              <Tooltip title="Start a game">
                <IconButton aria-label="settings" color="primary" size="small">
                  <PlayArrowIcon fontSize="large"/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Specifications">
                <IconButton aria-label="settings">
                  <SettingsIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );

  useEffect(() => {
    setLoading(true);
    // Gets published games
    getPublicGames([{
      property: 'visibility',
      condition: '==',
      value: GameVisibility.PUBLIC,
    }]);

    if (auth.currentUser) {
      // Gets Private games
      getPrivateGames([{
        property: 'visibility',
        condition: '==',
        value: GameVisibility.PRIVATE,
      }, {
        property: 'publisherId',
        condition: '==',
        value: auth.currentUser.uid,
      }]);

      // Gets Pending games
      getPendingGames([{
        property: 'visibility',
        condition: '==',
        value: GameVisibility.PENDING,
      },
      {
        property: 'publisherId',
        condition: '==',
        value: auth.currentUser.uid,
      }]);
    }
  }, []);

  useEffect(() => {
    const fromParam = searchParams.get('from');
    switch (fromParam) {
      case 'gameCreated':
        AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.gameCreated), dispatch);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Layout title={Utils.getTranslation(translator.pages.games.title)}>
      <Container>
        <Grid container sx={{
          margin: '15px 0 15px 0',
        }}>
          <Grid item xs={12} sm={6}>
            <SearchBar setSearchQuery={handleChangeSearchQuery} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth={false}
              startIcon={<AddIcon />}
              onClick={createGame}
            >
              {Utils.getTranslation(translator.pages.games.createGame)}
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="Available games"
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab
                label="Published"
                id='full-width-tab-0'
                aria-controls= 'full-width-tabpanel-0'
              />
              <Tab
                label="Private"
                id='full-width-tab-1'
                aria-controls= 'full-width-tabpanel-1'
              />
              <Tab
                label="Pending"
                id='full-width-tab-2'
                aria-controls= 'full-width-tabpanel-2'
              />
            </Tabs>
          </Box>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIndex}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={tabIndex} index={0}>
              {renderFilteredGames()}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              {renderFilteredGames()}
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              {renderFilteredGames()}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
      <Spinner show={loading}/>
    </Layout>
  );
};

export default Games;
