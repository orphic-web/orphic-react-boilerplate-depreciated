import Permissions from './enums/Permissions';
import SupportedLanguages from './enums/SupportedLanguages';
import Session from './Session';

// The user that uses the platform
type User = {
   /** The id of the Firestore user document and Firebase Auth user. */
   id: string,

   /** The full display name of the User. */
   name: string,

   /** The user's contact email and login credential. */
   email: string,

   /** The date at which the User was created. */
   createdDate: Date,

   /** The user's app permissions */
   permission: Permissions,

   /** The user's preferred display language. */
   language: SupportedLanguages,

   /** The user's session of played games */
   sessions: Session[]
}

export default User;
