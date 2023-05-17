import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Container, Typography, Link, Button, Avatar
} from '@mui/material';
import * as yup from 'yup';
import {
    Box,
} from '@mui/material';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppDispatch } from '@/store/Hooks';
import EmailService from '@/services/EmailService';
import AlertUtil from '@/utils/AlertUtils';
import Spinner from '@/common/spinner/Spinner';
import AlertsContainer from '@/common/layout/components/alertsContainer/AlertsContainer';

const ForgotPassword: React.FC = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const sendResetPasswordLink = async (values: any) => {
        try {
            setLoading(true);
            await EmailService.sendResetPasswordLink(values.email);
            setLoading(false);

            AlertUtil.createSuccessAlert("Check your email for the reset password link.", dispatch);
        } catch (e: any) {
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
                    }}
                    validationSchema={yup.object({
                        email: yup.string()
                            .email("Please enter a valid email address.")
                            .required("Please fill this field."),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        sendResetPasswordLink(values);
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
                            <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark' }}>
                                <LockOutlinedIcon style={{ color: '#fdfdfd' }} />
                            </Avatar>
                            <Typography variant="h5">Recover your password</Typography>
                            <Form>
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
                                    Submit
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
                                <Link href="/login" variant="body2">I already know my password</Link>
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

export default ForgotPassword;