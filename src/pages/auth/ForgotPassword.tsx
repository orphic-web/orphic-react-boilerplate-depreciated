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
  Box,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import TextInput from '../../components/formFields/TextInput';
import EmailService from '../../services/EmailService';
import CustomAlert from '../../components/alert/CustomAlert';

const ForgotPassword: React.FC = () => {
  const [globalMsg, setGlobalMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const sendResetPasswordLink = async (values: any) => {
    try {
      await EmailService.sendResetPasswordLink(values.email);
    } catch (e: any) {
      console.log(e);
      setOpenAlert(false);
      setGlobalMsg('We could not send password reset link at the moment, try again later.');
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnBlur={false}
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
                <TextInput
                  name='email'
                  label="Email"
                  autoComplete="email"
                  type="email"
                  required
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
                    textAlign: 'right',
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
      <CustomAlert open={openAlert} severity="error" message={globalMsg} setOpen={setOpenAlert}/>
    </>
  );
};

export default ForgotPassword;
