import * as yup from 'yup';

import {
    Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField } from 'formik-mui';
import { EmailAuthProvider } from 'firebase/auth';
import { useAppDispatch } from '@/store/Hooks';
import Spinner from '@/common/spinner/Spinner';
import Utils from '@/utils/Utils';
import UserService from '@/services/UserService';
import { auth } from '@/FirebaseConfig';
import AlertUtils from '@/utils/AlertUtils';

interface Props {
    setShow: any,
    show: boolean
}

const PromptForCredentials: React.FC<Props> = ({ setShow, show }) => {

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
                await AlertUtils.createSuccessAlert("You have successfully been reauthenticated!", dispatch);
            } else {
                throw Error();
            }

            setShow(false);
        } catch (e: any) {
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
                        password: yup.string().required("Please fill this field."),
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
                                    Authentification
                                </DialogTitle>
                                <DialogContent>
                                    <Typography variant="subtitle1">
                                        We have to confirm your identity before continuing.
                                    </Typography>
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
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color='error'
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => setShow(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => formikProps.submitForm()}
                                    >
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Form>
                    )}
                </Formik>
                <Spinner show={loading} />
            </Box>
        </Container>
    );
};

export default PromptForCredentials;