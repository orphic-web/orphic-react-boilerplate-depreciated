import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import * as yup from 'yup';

import {
    Box, Button, Container, FormControlLabel, IconButton, InputAdornment, Link,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Switch, TextField } from 'formik-mui';
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth';
import UserService from '../../services/UserService';
import { useAppDispatch, useAppSelector } from '../../store/Hooks';
import ErrorService from '../../services/ErrorService';
import { auth } from '../../FirebaseConfig';
import Spinner from '../../components/Spinner';
import Utils from '../../utils/Utils';
import translator from '../../theme/translator.json';
import AlertsContainer from '../../components/AlertsContainer';
import SupportedLanguages from '../../models/enums/SupportedLanguages';

const Login: React.FC = () => {
    const language = useAppSelector((state) => state.user.language) as SupportedLanguages;
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
            await ErrorService.handleError(e, dispatch, language);
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
                        email: '',
                        password: '',
                        rememberMe: true,
                    }}
                    validationSchema={yup.object({
                        email: yup.string()
                            .email(Utils.getTranslation(translator.formMessages.invalidEmail, language))
                            .required(Utils.getTranslation(translator.formMessages.requiredField, language)),
                        password: yup.string().required(Utils.getTranslation(translator.formMessages.requiredField, language)),
                        stayConnected: yup.boolean(),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        login(values);
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
                            <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'primary.main', color: 'info.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h3">
                                {Utils.getTranslation(translator.pages.login.title, language)}
                            </Typography>
                            <Form>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    color='primary'
                                    label={Utils.getTranslation(translator.pages.login.email, language)}
                                    margin='normal'
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    name="password"
                                    margin='normal'
                                    color='primary'
                                    type={showPassword ? 'text' : 'password'}
                                    label={Utils.getTranslation(translator.pages.login.password, language)}
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
                                <FormControlLabel
                                    control={
                                        <Field component={Switch} type="checkbox" name="rememberMe" />
                                    }
                                    label={Utils.getTranslation(translator.pages.login.rememberMe, language)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {Utils.getTranslation(translator.pages.login.submit, language)}
                                </Button>
                            </Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Link href="/forgot-password" variant="body2">
                                    {Utils.getTranslation(translator.pages.login.toForgotPassword, language)}
                                </Link>
                                <Link href="/signup" variant="body2">
                                    {Utils.getTranslation(translator.pages.login.toSignup, language)}
                                </Link>
                            </Box>
                        </Box>
                    )}
                </Formik>
                <Spinner show={loading} />
                <AlertsContainer />
            </Box>
        </Container>
    );
};

export default Login;
