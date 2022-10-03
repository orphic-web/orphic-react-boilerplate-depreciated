import * as yup from 'yup';

import {
  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';
import Spinner from './Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';

interface Props {
  action: any,
  show: boolean
}

const PromptForCredentials: React.FC<Props> = ({ action, show }) => {
  const language = useAppSelector((state) => state.user.language);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const reauthenticate = async (values: any) => {
    try {
      setLoading(true);

      const { password } = values;

      console.log(password);

      // await UserService.login(values.email, values.password);

      setLoading(false);
      navigate('/');
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (show) handleOpen();
      else handleClose();
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  }, [alert]);

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
          onSubmit={(values, { setSubmitting }) => {
            reauthenticate(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {Utils.getTranslation(language, translator.components.promptForCredentials.title)}
              </DialogTitle>
              <DialogContent>
                <Form>
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

                </Form>
                <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {Utils.getTranslation(language, translator.components.promptForCredentials.form.submit)}
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClose}
                >
                  {Utils.getTranslation(language, translator.components.promptForCredentials.form.submit)}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Formik>
        <Spinner show={loading}/>
      </Box>
    </Container>
  );
};

export default PromptForCredentials;
