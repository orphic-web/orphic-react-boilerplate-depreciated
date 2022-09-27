import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import {
  Box, IconButton, InputAdornment,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import UserService from '../../services/UserService';
import { useAppDispatch, useAppSelector } from '../../store/Hooks';
import ErrorService from '../../services/ErrorService';
import EmailService from '../../services/EmailService';
import { auth } from '../../FirebaseConfig';
import Spinner from '../../components/Spinner';
import SupportedLanguages from '../../models/enums/SupportedLanguages';
import translator from '../../theme/translator.json';
import Utils from '../../utils/Utils';

const Signup: React.FC = () => {
  const language = useAppSelector((state) => state.user.language);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createAccount = async (values: any) => {
    try {
      setLoading(true);

      const firebaseUser = await UserService.createAccount(values.email, values.password);
      await UserService.create(firebaseUser.user.uid, values.name, values.email, SupportedLanguages.DEFAULT);

      if (auth.currentUser) await EmailService.sendAccountConfirmation(auth.currentUser);
      console.log('asdasd');
      setLoading(false);
      navigate('/');
    } catch (e: any) {
      if (auth.currentUser) {
        UserService.delete(auth.currentUser.uid);
        UserService.deleteAccount(auth.currentUser);
      }
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
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={yup.object({
            name: yup.string()
              .required(Utils.getTranslation(language, translator.formMessages.requiredField)),
            email: yup.string()
              .email(Utils.getTranslation(language, translator.formMessages.invalidEmail))
              .required(Utils.getTranslation(language, translator.formMessages.requiredField)),
            password: yup.string().min(6).required(Utils.getTranslation(language, translator.formMessages.requiredField)),
            passwordConfirmation: yup.string()
              .required(Utils.getTranslation(language, translator.formMessages.requiredField))
              .oneOf([yup.ref('password'), null], Utils.getTranslation(language, translator.formMessages.passwordsMustMatch)),
          })}
          onSubmit={(values, { setSubmitting }) => {
            createAccount(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '500px',
              }}
            >
              <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark', color: 'info.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h3">
                {Utils.getTranslation(language, translator.pages.signup.title)}
              </Typography>
              <Form className="login__form-container">
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label={Utils.getTranslation(language, translator.pages.signup.fullName)}
                  margin='normal'
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label={Utils.getTranslation(language, translator.pages.signup.email)}
                  margin='normal'
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="password"
                  margin='normal'
                  type={showPassword ? 'text' : 'password'}
                  label={Utils.getTranslation(language, translator.pages.signup.password)}
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
                  label={Utils.getTranslation(language, translator.pages.signup.passwordConfirmation)}
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
                  {Utils.getTranslation(language, translator.pages.signup.submit)}
                </Button>
              </Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'left',
                  width: '100%',
                }}
              >
                <Link href="/login" variant="body2">
                  {Utils.getTranslation(language, translator.pages.signup.toLogin)}
                </Link>
              </Box>
            </Box>
          )}
        </Formik>
        <Spinner show={loading}/>
      </Box>
    </Container>
  );
};

export default Signup;
