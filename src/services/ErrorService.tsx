import { FirebaseError } from 'firebase/app';
import * as Sentry from '@sentry/react';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import AlertUtil from '../utils/AlertUtil';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';

class ErrorService {
  private static currentLanguage = SupportedLanguages.DEFAULT;

  static handleError = async (error: any, dispatch: any, language?: SupportedLanguages) => {
    // Send event to Sentry project
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }

    if (language) ErrorService.currentLanguage = language;
    if (error instanceof FirebaseError) {
      return ErrorService.handleFirebaseError(error, dispatch);
    }

    return ErrorService.handleGeneralError(error, dispatch);
  };

  static handleFirebaseError = async (error: FirebaseError, dispatch: any) => {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found': {
        const message = await Utils.getTranslation(translator.errorMessages.firebase.auth.userNotFound, this.currentLanguage);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/network-request-failed': {
        const message = await Utils.getTranslation(translator.errorMessages.firebase.auth.networkRequestFailed, this.currentLanguage);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/email-already-in-use': {
        const message = await Utils.getTranslation(translator.errorMessages.firebase.auth.emailAlreadyInUse, this.currentLanguage);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      default: {
        const message = await Utils.getTranslation(translator.errorMessages.general.unknown, this.currentLanguage);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
    }
  };

  static handleGeneralError = async (error: Error, dispatch: any) => {
    const message = await Utils.getTranslation(translator.errorMessages.general.unknown, this.currentLanguage);
    if (message) AlertUtil.createErrorAlert(message as string, dispatch);
  };
}

export default ErrorService;
