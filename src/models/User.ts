import Permissions from './enums/Permissions';
import SupportedLanguages from './enums/SupportedLanguages';

type User = {
    /** The id of the Firestore user document and Firebase Auth user. */
    id: string,

    /** The user's contact email and login credential. */
    email: string,

    /** The full display name of the User. */
    name: string,

    /** The date at which the User was created. */
    createdDate: Date,

    /** The user's app permissions */
    permission: Permissions,

    /** The user's preferred display language. */
    language: SupportedLanguages
}

export default User;
