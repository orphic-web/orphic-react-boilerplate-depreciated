import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';
import { useAppSelector } from '../store/Hooks';
import SupportedLanguages from '../models/enums/SupportedLanguages';

const Notifications: React.FC = () => {
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  return (
    <Layout title={Utils.getTranslation(translator.pages.notifications.title, language)}>
      <Spinner show={false}/>
    </Layout>
  );
};

export default Notifications;
