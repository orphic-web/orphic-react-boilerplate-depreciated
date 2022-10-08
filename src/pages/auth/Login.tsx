import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';
import {
  Avatar,
  Box, Button, Container, FormControlLabel, IconButton, InputAdornment, Link, Paper, Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Switch, TextField } from 'formik-mui';
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth';
import UserService from '../../services/UserService';
import { useAppDispatch } from '../../store/Hooks';
import ErrorService from '../../services/ErrorService';
import { auth } from '../../FirebaseConfig';
import Spinner from '../../components/Spinner';
import Utils from '../../utils/Utils';
import translator from '../../theme/translator.json';
import logo from '../../theme/assets/logo.png';
import AlertsContainer from '../../components/AlertsContainer';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async (values: any) => {
    try {
      setLoading(true);

      // Closing the window would not clear any existing state
      if (values.rememberMe) setPersistence(auth, browserLocalPersistence);

      // Closing the window would clear any existing state
      else setPersistence(auth, browserSessionPersistence);
      await UserService.login(values.email, values.password);

      setLoading(false);
      navigate('/');
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            rememberMe: true,
          }}
          validationSchema={yup.object({
            email: yup.string()
              .email(Utils.getTranslation(translator.formMessages.invalidEmail))
              .required(Utils.getTranslation(translator.formMessages.requiredField)),
            password: yup.string().required(Utils.getTranslation(translator.formMessages.requiredField)),
            stayConnected: yup.boolean(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '600px',
            }}>
              <Box sx={{
                maxWidth: '250px',
              }}>
                <img src={logo}/>
              </Box>
              <Paper sx={{
                margin: '15px',
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography variant="h3">
                    {Utils.getTranslation(translator.pages.login.title)}
                  </Typography>
                  <Form>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      color='primary'
                      label={Utils.getTranslation(translator.pages.login.email)}
                      margin='normal'
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="password"
                      margin='normal'
                      color='primary'
                      type={showPassword ? 'text' : 'password'}
                      label={Utils.getTranslation(translator.pages.login.password)}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={(e: any) => e.preventDefault()}
                              color="primary"
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
                      label={Utils.getTranslation(translator.pages.login.rememberMe)}
                    />
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {Utils.getTranslation(translator.pages.login.submit)}
                      </Button>
                    </Box>
                  </Form>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                    <Link href="/forgot-password" variant="body2">
                      {Utils.getTranslation(translator.pages.login.toForgotPassword)}
                    </Link>
                    <Link href="/signup" variant="body2">
                      {Utils.getTranslation(translator.pages.login.toSignup)}
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Formik>
        <Spinner show={loading}/>
        <AlertsContainer/>
      </Box>
    </Container>
  );
};

export default Login;
