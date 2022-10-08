import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import AlertUtils from '../utils/AlertUtil';
import ErrorService from '../services/ErrorService';

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  useEffect(() => {
    const fromParam = searchParams.get('from');
    switch (fromParam) {
      case 'accountCreated':
        AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.accountCreated, language), dispatch);
        break;
      default:
        break;
    }
  }, []);

  const throwError = () => {
    try {
      throw Error('Test your Sentry connection');
    } catch (e: any) {
      ErrorService.handleError(e, dispatch, language);
    }
  };

  return (
    <Layout title={Utils.getTranslation(translator.pages.dashboard.title, language)}>
      <Button onClick={() => throwError()}>Test your Sentry connection</Button>
      <Spinner show={false}/>
    </Layout>
  );
};

export default Dashboard;
