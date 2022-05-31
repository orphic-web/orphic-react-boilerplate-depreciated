import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import './Signup.css';
import {
  Box, IconButton, InputAdornment,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import UserService from '../../services/UserService';
import { useAppDispatch, useAppSelector } from '../../store/Hooks';
import ErrorService from '../../services/ErrorService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.user.language);
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createAccount = async (values: any) => {
    try {
      await UserService.createAccount(values.email, values.password, 'fr');
      navigate('/');
    } catch (e: any) {
      ErrorService.handleHTTPError(e, language, dispatch);
    }
  };

  useEffect(() => {
    try {
      if (firebaseUser) navigate('/');
    } catch (e: any) {
      ErrorService.handleHTTPError(e, language, dispatch);
    }
  }, [firebaseUser]);

  return (
    <div className='signup__container'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={yup.object({
          email: yup.string()
            .email('Email is invalid')
            .required('Required'),
          password: yup.string().min(6).required('Required'),
          passwordConfirmation: yup.string()
            .required('Requis')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          createAccount(values);
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <Container maxWidth='md' >
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
              <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark' }}>
                <LockOutlinedIcon style={{ color: '#fdfdfd' }} />
              </Avatar>
              <Typography component="h1" variant="h5">
            Create your account
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
                <Field
                  component={TextField}
                  name="passwordConfirmation"
                  margin='normal'
                  type={showPassword ? 'text' : 'password'}
                  label="Password Confirmation"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
              Confirm
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
                  xs='auto'
                  md={6}
                  sx={{
                    textAlign: 'left',
                  }}>
                  <Link href="/login" variant="body2">
                  Already have an account?
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

export default Signup;
