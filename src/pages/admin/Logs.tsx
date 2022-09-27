import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import SupportedLanguages from '../../models/enums/SupportedLanguages';
import { useAppSelector } from '../../store/Hooks';
import Utils from '../../utils/Utils';
import translator from '../../theme/translator.json';

const Logs: React.FC = () => {
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  return (
    <Layout title={Utils.getTranslation(language, translator.pages.admin.logs.title)}>
      <Spinner show={false}/>
    </Layout>
  );
};

export default Logs;
