import { FirebaseError } from 'firebase/app';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import AlertUtils from '../utils/AlertUtils';
import TranslatorUtils from '../utils/TranslatorUtil';
import translator from '../theme/translator.json';

class ErrorService {
  private static currentLanguage = SupportedLanguages.DEFAULT;

  static handleError = async (error: any, language: SupportedLanguages, dispatch: any) => {
    console.log(error);

    if (language) ErrorService.currentLanguage = language;

    if (error instanceof FirebaseError) {
      return ErrorService.handleFirebaseError(error, dispatch);
    }
    return ErrorService.handleGeneralError(error, dispatch);
  };

  static handleFirebaseError = async (error: FirebaseError, dispatch: any) => {
    switch (error.code) {
      case 'auth/user-not-found': {
        const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.userNotFound);
        if (message) AlertUtils.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/network-request-failed': {
        const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.networkRequestFailed);
        if (message) AlertUtils.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/email-already-in-use': {
        const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.emailAlreadyInUse);
        if (message) AlertUtils.createErrorAlert(message as string, dispatch);
        break;
      }
      default: {
        const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errorMessages.general.unknown);
        if (message) AlertUtils.createErrorAlert(message as string, dispatch);
        break;
      }
    }
  };

  static handleGeneralError = async (error: Error, dispatch: any) => {
    const message = await TranslatorUtils.getTranslation(this.currentLanguage, translator.errorMessages.general.unknown);
    if (message) AlertUtils.createErrorAlert(message as string, dispatch);
  };
}

export default ErrorService;
