import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Button, Container, Tab, Tabs, useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwipeableViews from 'react-swipeable-views';

import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';
import { useAppDispatch } from '../store/Hooks';

import AlertUtils from '../utils/AlertUtil';
import TabPanel from '../components/TabPanel';

const Games: React.FC = () => {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFilter(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setFilter(index);
  };

  useEffect(() => {
    setLoading(true);

    console.log('fetch available games');

    setLoading(false);
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
        <Box sx={{
          margin: '20px 0 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth={false}
            startIcon={<AddIcon />}
          >
            {Utils.getTranslation(translator.pages.games.createGame)}
          </Button>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={filter}
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
            </Tabs>
          </Box>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={filter}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={filter} index={0}>
              Published
            </TabPanel>
            <TabPanel value={filter} index={1}>
              Private
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
      <Spinner show={loading}/>
    </Layout>
  );
};

export default Games;
