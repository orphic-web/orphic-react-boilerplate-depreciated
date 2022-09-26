import Permissions from './enums/Permissions';
import SupportedLanguages from './enums/SupportedLanguages';

type User = {
    id: string,
    email: string,
    name: string,
    createdDate: Date,
    permission: Permissions,
    language: SupportedLanguages
}

export default User;
