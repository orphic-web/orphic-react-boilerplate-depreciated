import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import './ForgotPassword.css';
import {
  Box, TextField,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailService from '../../services/EmailService';
import CustomAlert from '../../components/CustomAlert';
import { useAppSelector } from '../../store/Hooks';

const ForgotPassword: React.FC = () => {
  const [globalMsg, setGlobalMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (firebaseUser) navigate('/');
    } catch (e: any) {
      console.log(e);
    }
  }, [firebaseUser]);

  const sendResetPasswordLink = async (values: any) => {
    try {
      await EmailService.sendResetPasswordLink(values.email);
      setGlobalMsg('An email as been sent, if the user exists.');
      setAlertSeverity('success');
      setOpenAlert(true);
    } catch (e: any) {
      console.log(e);
      setOpenAlert(false);
      setAlertSeverity('error');
      setGlobalMsg('We could not send password reset link at the moment, try again later.');
    }
  };

  return (
    <div className='forgotPassword__container'>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={yup.object({
          email: yup.string()
            .email('Email is invalid')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          sendResetPasswordLink(values);
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
            Reset your password
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
              Send reset password email
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
                  back to login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </Formik>
      <CustomAlert open={openAlert} severity={alertSeverity} message={globalMsg} setOpen={setOpenAlert}/>
    </div>
  );
};

export default ForgotPassword;
