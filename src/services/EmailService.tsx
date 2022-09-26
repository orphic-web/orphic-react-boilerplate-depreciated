import {
  sendEmailVerification, sendPasswordResetEmail, User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

class EmailService {
  static publicUrl: string = process.env.REACT_APP_PUBLIC_URL as string;

  /**
   * Send account confirmation to user
   *
   * @returns {void}
   */
  static sendAccountConfirmation = (currentUser: FirebaseUser) => sendEmailVerification(currentUser, { url: `${this.publicUrl}/?from=accountConfirmed` });

  /**
   * Send reset password link to user
   *
   * @param {string} email
   * @returns {void}
   */
  static sendResetPasswordLink = (email: string) => sendPasswordResetEmail(auth, email, { url: `${this.publicUrl}/login?from=passwordReset` });
}

export default EmailService;
