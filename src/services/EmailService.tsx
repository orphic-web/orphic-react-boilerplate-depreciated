/* eslint-disable no-useless-catch */
import {
  sendEmailVerification, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

class EmailService {
  static publicUrl: string = process.env.REACT_APP_PUBLIC_URL as string;

  /**
   * Send account confirmation to user email
   *
   * @returns {void}
   */
  static sendAccountConfirmation = async () => {
    try {
      if (!auth.currentUser) throw Error('Could not send verification email.');
      await sendEmailVerification(auth.currentUser, { url: `${this.publicUrl}/?from=accountConfirmed` });
    } catch (e: any) {
      throw e;
    }
  };

  /**
   * Send reset password link to the user
   *
   * @param {string} email
   * @returns {void}
   */
  static sendResetPasswordLink = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, { url: `${this.publicUrl}/login?from=passwordReset` });
    } catch (e: any) {
      throw e;
    }
  };
}

export default EmailService;
