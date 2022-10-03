import * as yup from 'yup';

import {
  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField } from 'formik-mui';
import { EmailAuthProvider } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import Spinner from './Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';
import UserService from '../services/UserService';
import { auth } from '../FirebaseConfig';
import AlertUtils from '../utils/AlertUtil';

interface Props {
  setShow: any,
  show: boolean
}

const PromptForCredentials: React.FC<Props> = ({ setShow, show }) => {
  const language = useAppSelector((state) => state.user.language);

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const reauthenticate = async (values: any) => {
    try {
      setLoading(true);
      const { password } = values;

      if (auth.currentUser && auth.currentUser.email) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password,
        );
        await UserService.reauthenticate(auth?.currentUser, credential);
        setLoading(false);
        await AlertUtils.createSuccessAlert(Utils.getTranslation(language, translator.successMessages.reauthenticate), dispatch);
      } else {
        throw Error();
      }

      setShow(false);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
      setShow(false);
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
            password: '',
          }}
          validationSchema={yup.object({
            password: yup.string().required(Utils.getTranslation(language, translator.formMessages.requiredField)),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            reauthenticate(values);
            setSubmitting(false);
            resetForm();
            setShowPassword(false);
          }}
        >
          {(formikProps) => (
            <Form>
              <Dialog
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {Utils.getTranslation(language, translator.components.promptForCredentials.title)}
                  <Typography variant="subtitle1">
                    {Utils.getTranslation(language, translator.components.promptForCredentials.subheader)}
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <Field
                    component={TextField}
                    name="password"
                    margin='normal'
                    color='primary'
                    type={showPassword ? 'text' : 'password'}
                    label={Utils.getTranslation(language, translator.components.promptForCredentials.form.password)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={(e: any) => e.preventDefault()}
                            color="info"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    color='error'
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => setShow(false)}
                  >
                    {Utils.getTranslation(language, translator.components.promptForCredentials.form.cancel)}
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => formikProps.submitForm()}
                  >
                    {Utils.getTranslation(language, translator.components.promptForCredentials.form.submit)}
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
        <Spinner show={loading}/>
      </Box>
    </Container>
  );
};

export default PromptForCredentials;
