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
import AlertsContainer from '../../components/AlertsContainer';

const Signup: React.FC = () => {
    const language = useAppSelector((state) => state.user.language) as SupportedLanguages;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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

            setLoading(false);
            navigate('/?from=accountCreated');
        } catch (e: any) {
            if (auth.currentUser) {
                UserService.delete(auth.currentUser.uid);
                UserService.deleteAccount(auth.currentUser);
            }
            ErrorService.handleError(e, dispatch, language);
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
                            .required("Please fill this field."),
                        email: yup.string()
                            .email("Please enter a valid email address.")
                            .required("Utils.getTranslation(translator.formMessages.requiredField"),
                        password: yup.string().min(6).required("Please fill this field."),
                        passwordConfirmation: yup.string()
                            .required("Please fill this field.")
                            .oneOf([yup.ref('password'), null], "Passwords do not match."),
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
                                {Utils.getTranslation(translator.pages.signup.title, language)}
                            </Typography>
                            <Form className="login__form-container">
                                <Field
                                    component={TextField}
                                    name="name"
                                    type="text"
                                    label={Utils.getTranslation(translator.pages.signup.fullName, language)}
                                    margin='normal'
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label={Utils.getTranslation(translator.pages.signup.email, language)}
                                    margin='normal'
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    name="password"
                                    margin='normal'
                                    type={showPassword ? 'text' : 'password'}
                                    label={Utils.getTranslation(translator.pages.signup.password, language)}
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
                                    label={Utils.getTranslation(translator.pages.signup.passwordConfirmation, language)}
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
                                    {Utils.getTranslation(translator.pages.signup.submit, language)}
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
                                    {Utils.getTranslation(translator.pages.signup.toLogin, language)}
                                </Link>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
            <Spinner show={loading} />
            <AlertsContainer />
        </Container>
    );
};

export default Signup;
