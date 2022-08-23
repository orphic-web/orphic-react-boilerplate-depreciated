import SupportedLanguages from './enums/SupportedLanguages';

interface User {
  id: string,
  email: string,
  name: string,
  language: SupportedLanguages,
}

export default User;
