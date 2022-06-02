import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import './Login.css';
import {
  Box, Button, FormControlLabel, Grid, IconButton, InputAdornment, Link,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Switch, TextField } from 'formik-mui';
import UserService from '../../services/UserService';
import { useAppSelector, useAppDispatch } from '../../store/Hooks';
import ErrorService from '../../services/ErrorService';
import { toggleSpinner } from '../../store/slices/SpinnerSlice';

const Login: React.FC = () => {
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const language = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    try {
      if (firebaseUser) navigate('/');
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [firebaseUser]);

  const login = async (values: any) => {
    try {
      dispatch(toggleSpinner(true));
      await UserService.login(values.email, values.password, values.rememberMe);
      dispatch(toggleSpinner(false));
      navigate('/');
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  };

  return (
    <div className='login__container'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: true,
        }}
        validationSchema={yup.object({
          email: yup.string()
            .email('Email is invalid')
            .required('Required'),
          password: yup.string().required('Required'),
          stayConnected: yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          login(values);
          setSubmitting(false);
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
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '800px',
              }}
            >
              <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark' }}>
                <LockOutlinedIcon style={{ color: '#fdfdfd' }} />
              </Avatar>
              <Typography component="h1" variant="h5">
            Sign in
              </Typography>
              <Form className="login__form-container">
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  margin='normal'
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="password"
                  margin='normal'
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e: any) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={
                    <Field component={Switch} type="checkbox" name="rememberMe" />
                  }
                  label="Remember Me"
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
                  <Link href="/forgot-password" variant="body2">
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
                  <Link href="/signup" variant="body2">
                    {'Don\'t have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </Formik>
    </div>

  );
};

export default Login;
