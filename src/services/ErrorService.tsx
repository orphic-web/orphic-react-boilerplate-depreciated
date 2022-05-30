import { FirebaseError } from 'firebase/app';
import AvailableLanguages from '../models/enums/AvailableLanguages';
import FirebaseErrorMessages from '../models/enums/FirebaseErrorMessages';
import AlertUtil from '../utils/AlertUtil';
import TranslatorUtils from '../utils/TranslatorUtil';

class ErrorService {
  private static currentLanguage = AvailableLanguages.DEFAULT;

  static handleHTTPError = async (error: any, language: AvailableLanguages, dispatch: any) => {
    try {
      if (language) this.currentLanguage = language;

      if (error instanceof FirebaseError) {
        console.log('firebaseError');
        await this.handleFirebaseError(error, dispatch);
      } else {
        console.log('unknown error');
        AlertUtil.createErrorAlert('Unknow error', this.currentLanguage, dispatch);
      }
    } catch (e: any) {
      throw e.message;
    }
  };

  static handleFirebaseError = async (error: FirebaseError, dispatch: any) => {
    try {
      switch (error.code) {
        case 'auth/user-not-found': {
          // Should log the event in firestore.
          const message = await TranslatorUtils.getTranslatedEnumValue(this.currentLanguage, 'FirebaseErrorMessages', FirebaseErrorMessages.AUTH_USER_NOT_FOUND);
          console.log(message);
          if (message) AlertUtil.createErrorAlert(message as string, this.currentLanguage, dispatch);
          break;
        }
        default: {
          // statements;
          break;
        }
      }
    } catch (e: any) {
      throw e.message;
    }
  };
}

export default ErrorService;
