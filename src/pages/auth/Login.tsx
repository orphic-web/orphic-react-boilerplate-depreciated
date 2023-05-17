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
import UserService from '@/services/UserService';
import { useAppDispatch } from '@/store/Hooks';
import { auth } from '@/FirebaseConfig';
import Spinner from '@/common/spinner/Spinner';
import AlertsContainer from '@/common/layout/components/alertsContainer/AlertsContainer';
import AlertUtils from '@/utils/AlertUtils';

const Login: React.FC = () => {
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
            setLoading(false);
            AlertUtils.createErrorAlert("Invalid email or password, please verify your credentials and try again.", dispatch);
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
                        email: '',
                        password: '',
                        rememberMe: true,
                    }}
                    validationSchema={yup.object({
                        email: yup.string()
                            .email("Please enter a valid email address.")
                            .required("Please fill this field."),
                        password: yup.string().required("Please fill this field."),
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
                            <Typography variant="h3">Login</Typography>
                            <Form>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    color='primary'
                                    label="Email"
                                    margin='normal'
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    name="password"
                                    margin='normal'
                                    color='primary'
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
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
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
                                <Link href="/forgot-password" variant="body2">I forgot my password</Link>
                                <Link href="/signup" variant="body2">I don't have an account</Link>
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
