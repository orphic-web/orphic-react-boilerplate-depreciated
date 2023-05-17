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
import UserService from '@/services/UserService';
import EmailService from '@/services/EmailService';
import { auth } from '@/FirebaseConfig';
import Spinner from '@/common/spinner/Spinner';
import AlertsContainer from '@/common/layout/components/alertsContainer/AlertsContainer';
import AlertUtils from '@/utils/AlertUtils';
import { useAppDispatch } from '@/store/Hooks';

const Signup: React.FC = () => {
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

            await UserService.createAccount(values.email, values.password);

            if (auth.currentUser) {
                await UserService.create(auth.currentUser.uid, values.name, values.email);
                await EmailService.sendAccountConfirmation(auth.currentUser);
            }

            setLoading(false);
            navigate('/?from=accountCreated');
        } catch (e: any) {
            if (auth.currentUser) {
                UserService.delete(auth.currentUser.uid);
                UserService.deleteAccount(auth.currentUser);
                AlertUtils.createErrorAlert("An error occurred while creating your account, please try again.", dispatch);
            } else {
                if (e.code) {
                    if (e.code === 'auth/email-already-in-use') {
                        AlertUtils.createErrorAlert("This email address is already in use.", dispatch);
                    }
                } else {
                    AlertUtils.createErrorAlert("An error occurred while creating your account, please try again.", dispatch);
                }
            }
            setLoading(false);
            console.error(e)
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
                            .required("Please fill this field."),
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
                            <Typography variant="h3">Create your account</Typography>
                            <Form className="login__form-container">
                                <Field
                                    component={TextField}
                                    name="name"
                                    type="text"
                                    label="Full name"
                                    margin='normal'
                                    fullWidth
                                />
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
                                    label="Password confirmation"
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
                                    Create your account
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
                                <Link href="/login" variant="body2">I already have an account</Link>
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
