import { FirebaseError } from 'firebase/app';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import AlertUtil from '../utils/AlertUtil';
import TranslatorUtils from '../utils/TranslatorUtil';
import translator from '../theme/translator.json';

class ErrorService {
  private static currentLanguage = SupportedLanguages.DEFAULT;

  static handleError = async (error: any, language: SupportedLanguages, dispatch: any) => {
    try {
      console.log(error);

      if (language) ErrorService.currentLanguage = language;

      if (error instanceof FirebaseError) {
        await ErrorService.handleFirebaseError(error, dispatch);
      } else {
        ErrorService.handleGeneralError(error, dispatch);
      }
    } catch (e: any) {
      throw e.message;
    }
  };

  static handleFirebaseError = async (error: FirebaseError, dispatch: any) => {
    try {
      switch (error.code) {
        case 'auth/user-not-found': {
          const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errors.firebase.auth.userNotFound);
          if (message) AlertUtil.createErrorAlert(message as string, dispatch);
          break;
        }
        case 'auth/network-request-failed': {
          const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errors.firebase.auth.networkRequestFailed);
          if (message) AlertUtil.createErrorAlert(message as string, dispatch);
          break;
        }
        default: {
          const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errors.general.unknown);
          if (message) AlertUtil.createErrorAlert(message as string, dispatch);
          break;
        }
      }
    } catch (e: any) {
      throw e.message;
    }
  };

  static handleGeneralError = async (error: Error, dispatch: any) => {
    try {
      const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errors.general.unknown);
      if (message) AlertUtil.createErrorAlert(message as string, dispatch);
    } catch (e: any) {
      throw e.message;
    }
  };
}

export default ErrorService;
