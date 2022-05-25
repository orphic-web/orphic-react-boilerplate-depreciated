import {
  sendEmailVerification, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

class EmailService {
  static sendVerificationEmail = async () => {
    try {
      if (!auth.currentUser) throw Error('Could not send verification email.');
      await sendEmailVerification(auth.currentUser);
    } catch (e: any) {
      throw e.message;
    }
  };

  /**
   * Send password reset password to the user
   *
   * @param {string} email
   * @returns {boolean} if the request is a success
   */
  static sendResetPasswordLink = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' });
      return true;
    } catch (e: any) {
      console.log(e.message);
      throw e.message;
    }
  };
}

export default EmailService;
