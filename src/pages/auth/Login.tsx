import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import './Login.css';
import {
  Box, IconButton, InputAdornment,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/formFields/TextInput';
import Checkbox from '../../components/formFields/Checkbox';
import UserService from '../../services/UserService';
import CustomAlert from '../../components/CustomAlert';
import { useAppSelector } from '../../store/Hooks';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [globalMsg, setGlobalMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    try {
      if (firebaseUser) navigate('/');
    } catch (e: any) {
      console.log(e);
    }
  }, [firebaseUser]);

  const login = async (values: any) => {
    try {
      await UserService.login(values.email, values.password, values.stayConnected);
      navigate('/');
    } catch (e: any) {
      console.log(e);
      setOpenAlert(true);
      setGlobalMsg('We could not authentificate you at the moment, try again later.');
    }
  };

  return (
    <div className='login__container'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          stayConnected: true,
        }}
        validateOnBlur={false}
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
                <TextInput
                  name='email'
                  label="Email"
                  autoComplete="email"
                  type="email"
                  required
                />
                <TextInput
                  name='password'
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
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
                <Checkbox
                  name='stayConnected'
                  label='Remember me'
                  color='primary'
                  fullWidth={false}
                  checked={formikProps.values.stayConnected}
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
      <CustomAlert open={openAlert} severity="error" message={globalMsg} setOpen={setOpenAlert}/>
    </div>

  );
};

export default Login;
