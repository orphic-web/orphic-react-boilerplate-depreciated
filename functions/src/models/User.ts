import SupportedLanguages from './enums/SupportedLanguages';

/** Model for Firestore User documents. */
interface User {
  /** The id of the User Firestore document and Firebase Auth User. */
  id: string,

  /** The date at which the User was created. */
  creationDate: any,

  /** The User's contact email and login credential. */
  email: string,

  /** The full display name of the User. */
  name: string,

  /** The User's preferred display language. */
  language: SupportedLanguages,
}

export default User;
