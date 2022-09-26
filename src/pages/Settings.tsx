import {
  Box, Button, Card, CardContent, CardHeader, Container, Divider,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-mui';
import { useState } from 'react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import translator from '../theme/translator.json';
import Utils from '../utils/Utils';
import User from '../models/User';
import UserService from '../services/UserService';
import ErrorService from '../services/ErrorService';

const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const updateUser = async (values: any) => {
    try {
      setLoading(true);
      const newName = values.name;
      const newUser = {
        ...user,
      } as User;
      newUser.name = newName;

      await UserService.update(newUser);
      setLoading(false);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout title={Utils.getTranslation(language, translator.pages.settings.title)}>
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '20px',
          }}
        >
          <Formik
            initialValues={{
              name: user?.name,
            }}
            validationSchema={yup.object({
              name: yup.string().required(Utils.getTranslation(language, translator.formMessages.requiredField)),
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
                    subheader={Utils.getTranslation(language, translator.pages.settings.information.subheader)}
                    title={Utils.getTranslation(language, translator.pages.settings.information.title)}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label={Utils.getTranslation(language, translator.pages.settings.information.inputs.nameLabel)}
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
                      {Utils.getTranslation(language, translator.pages.settings.information.submit)}
                    </Button>
                  </Box>
                </Card>

              </Form>
            )}
          </Formik>
        </Container>
        <Spinner show={false}/>
      </Layout>
      <Spinner show={loading}/>
    </>

  );
};

export default Settings;
