import {
    Box, Button, Card, CardContent, CardHeader, Container, Divider, Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-mui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/common/layout/Layout';
import Spinner from '@/common/spinner/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import User from '@/models/User';
import UserService from '@/services/UserService';
import AlertUtils from '@/utils/AlertUtils';
import { auth } from '@/FirebaseConfig';
import PromptForCredentials from '@/pages/settings/components/PromptForCredentials';
import VisibilityStates from '@/models/enums/VisibilityStates';

const Settings: React.FC = () => {
    const user = useAppSelector((state) => state.user.user) as User;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPromptCredential, setShowPromptCredential] = useState(false);

    const handlePromptCredentialAlert = (show: boolean) => {
        if (show) setShowPromptCredential(true);
        else setShowPromptCredential(false);
    };

    const updateUser = async (values: any) => {
        try {
            setLoading(true);
            const newName = values.name;

            await UserService.update(user.id, { name: newName });
            setLoading(false);
            await AlertUtils.createSuccessAlert("Update completed!", dispatch);
        } catch (e: any) {
            setLoading(false);
            AlertUtils.createErrorAlert("Error occurred while updating your information, try again", dispatch);
            console.error(e);
        }
    };

    const changeEmail = async (values: any) => {
        try {
            setLoading(true);
            const { newEmail } = values;

            if (auth.currentUser) {
                await UserService.updateEmail(auth.currentUser, newEmail);
                await UserService.update(user.id, { email: newEmail });
            }

            setLoading(false);
            await AlertUtils.createSuccessAlert("Update completed!", dispatch);
        } catch (e: any) {
            // Change email needs reauthantification if credentials have timed out
            if (e.code === 'auth/requires-recent-login') {
                setLoading(false);
                setShowPromptCredential(true);
            } else {
                setLoading(false);
                AlertUtils.createErrorAlert("Error occurred while changing your email, try again", dispatch);
                console.error(e);
            }
        }
    };

    const changePassword = async (values: any) => {
        try {
            setLoading(true);
            const { password } = values;
            if (auth.currentUser) {
                await UserService.updatePassword(auth.currentUser, password);
            }

            setLoading(false);
            await AlertUtils.createSuccessAlert("Update completed!", dispatch);
        } catch (e: any) {
            // Change password needs reauthantification if credentials have timed out
            if (e.code === 'auth/requires-recent-login') {
                setLoading(false);
                setShowPromptCredential(true);
            } else {
                setLoading(false);
                AlertUtils.createErrorAlert("Error occurred while changing password, try again", dispatch);
                console.error(e);
            }
        }
    };

    const deleteAccount = async () => {
        try {
            setLoading(true);
            if (auth.currentUser) {
                await UserService.update(user.id, { visibility: VisibilityStates.HIDDEN });
                await UserService.deleteAccount(auth.currentUser);
            } else {
                throw Error('Delete account - Firebase user undefined');
            }

            navigate('/signup');
            setLoading(false);
            await AlertUtils.createSuccessAlert("Update completed!", dispatch);
        } catch (e: any) {
            // Delete account needs reauthantification if credentials have timed out
            if (e.code === 'auth/requires-recent-login') {
                setLoading(false);
                setShowPromptCredential(true);
            } else {
                setLoading(false);
                AlertUtils.createErrorAlert("Error occurred while deleting your account, try again", dispatch);
                console.error(e);
            }
        }
    };

    return (
        <>
            <Layout title="Settings">
                <Container
                    maxWidth="lg"
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    {/**
             *  Personal information form
             */}
                    <Formik
                        initialValues={{
                            name: user?.name,
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Please fill this field."),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            updateUser(values);
                            setSubmitting(false);
                        }}
                    >
                        {(formikProps) => (
                            <Form>
                                <Card>
                                    <CardHeader
                                        title="Personal information"
                                        subheader="Manage your general information"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Field
                                            component={TextField}
                                            name="name"
                                            type="text"
                                            label="Full name"
                                            margin='normal'
                                            fullWidth
                                        />
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2,
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Container>

                {/**
             *  Change email form
             */}
                <Container
                    maxWidth="lg"
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    <Formik
                        initialValues={{
                            newEmail: '',
                        }}
                        validationSchema={yup.object({
                            newEmail: yup.string().required("Please fill this field."),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            changeEmail(values);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {(formikProps) => (
                            <Form>
                                <Card>
                                    <CardHeader
                                        title="Modify your email"
                                        subheader={user?.email}
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Field
                                            component={TextField}
                                            name="newEmail"
                                            type="text"
                                            label="New email"
                                            margin='normal'
                                            fullWidth
                                        />
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2,
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Container>

                {/**
             *  Password form
             */}
                <Container
                    maxWidth="lg"
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    <Formik
                        initialValues={{
                            password: '',
                            passwordConfirmation: '',
                        }}
                        validationSchema={yup.object({
                            password: yup.string().min(6).required("Please fill this field."),
                            passwordConfirmation: yup.string()
                                .required("Please fill this field.")
                                .oneOf([yup.ref('password'), null], "Passwords do not match."),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            changePassword(values);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {(formikProps) => (
                            <Form>
                                <Card>
                                    <CardHeader
                                        title="Modify yourr password"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Field
                                            component={TextField}
                                            name="password"
                                            type="password"
                                            label="New password"
                                            margin='normal'
                                            fullWidth
                                        />
                                        <Field
                                            component={TextField}
                                            name="passwordConfirmation"
                                            type="password"
                                            label="Password confirmation"
                                            margin='normal'
                                            fullWidth
                                        />
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2,
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Container>
                {/**
             *  Deleting account form
             */}
                <Container
                    maxWidth="lg"
                    sx={{
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <Card sx={{
                        backgroundColor: '#331f1e',
                    }}>
                        <CardHeader
                            title={
                                <Typography variant='h5' sx={{ color: 'error.main' }}>Delete yout account</Typography>
                            }
                            subheader={
                                <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                                    Deleting your account is permanent and cannot be undone!
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Button
                                sx={{ color: 'info.main' }}
                                variant='contained'
                                color="error"
                                onClick={() => deleteAccount()}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </Layout>
            <Spinner show={loading} />
            <PromptForCredentials show={showPromptCredential} setShow={handlePromptCredentialAlert} />
        </>

    );
};

export default Settings;
