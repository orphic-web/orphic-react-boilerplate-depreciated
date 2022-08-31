import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  Box, Button, ButtonGroup, Chip,
} from '@mui/material';
import { useState } from 'react';

const Login: React.FC = () => {
  const [bobiePts, setBobiePts] = useState(50);
  const [oliPts, setOliPts] = useState(50);
  const [bobieHistory, setBobieHistory] = useState([50]);
  const [oliHistory, setOliHistory] = useState([50]);
  console.log(bobieHistory);
  console.log(oliHistory);

  const updateBobie = async (value: any) => {
    setBobiePts(bobiePts + value);
    setBobieHistory(bobiePts + value);
  };

  const updateOli = async (value: any) => {
    setOliPts(oliPts + value);
    setOliHistory(oliPts + value);
  };

  return (
    <Container maxWidth='md'>
      <Box
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
        <Typography component="h1" variant="h5">
           Bobie
        </Typography>
        <Chip label={`points ${bobiePts}`} color={bobiePts <= 15 ? 'warning' : 'success'}variant="outlined" />
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateBobie(-10)}
          >
            -10
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateBobie(-5)}
          >
            -5
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateBobie(-1)}
          >
            -1
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateBobie(1)}
          >
            +1
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateBobie(5)}
          >
            +5
          </Button>
        </ButtonGroup>
      </Box>
      <Box
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
        <Typography component="h1" variant="h5">
           Oli
        </Typography>
        <Chip label={`points ${oliPts}`} color={oliPts <= 15 ? 'warning' : 'success'}variant="outlined" />
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateOli(-10)}
          >
            -10
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateOli(-5)}
          >
            -5
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateOli(-1)}
          >
            -1
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateOli(1)}
          >
            +1
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => updateOli(5)}
          >
            +5
          </Button>
        </ButtonGroup>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10',
          }}>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
