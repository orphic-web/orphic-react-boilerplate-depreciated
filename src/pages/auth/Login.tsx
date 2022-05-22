import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  TextField,
} from 'formik-mui';

import './Login.css';
import { Box } from '@mui/material';
import { Field, Form, Formik } from 'formik';

const Login: React.FC = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      select: '0-20',
      tags: [],
      rememberMe: true,
      date: new Date(),
      time: new Date(),
      dateTime: new Date(),
      toggle: [],
      autocomplete: [],
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {(formikProps) => (
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'secondary.main',
            padding: '40px 10px',
          }}
        >
          <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form>
            <Field
              margin="normal"
              required
              autoComplete="email"
              fullWidth
              component={TextField}
              type="email"
              label="Email"
              name="email"
              autoFocus
            />
            <Field
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Form>
          <Grid
            container
            spacing={3}
            sx={{
              maxWidth: '500px',
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: 'left',
              }}>
              <Link href="#" variant="body2">
                  Forgot password?
              </Link>
            </Grid>
            <Grid
              item
              xs='auto'
              md={6}
              sx={{
                textAlign: 'right',
              }}>
              <Link href="" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )}
  </Formik>
);

export default Login;
