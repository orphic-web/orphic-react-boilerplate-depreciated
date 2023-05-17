import { useId} from 'react';
import CustomAlert from '@/models/AppAlertType';
import AlertSeverity from '@/models/enums/AlertSeverities';
import { createAlert, dismissAlert, removeAlert } from '@/store/slices/AlertsSlice';

class AlertUtils {
  /**
   * Creates, dismiss and remove an alert
   * @param {AlertSeverity} severity
   * @param {string} message
   * @param {any} dispatch
   * @returns {void}
   */
  private static createAlert = async (alert: CustomAlert, dispatch: any) => {
    let timer2: any;
    dispatch(createAlert(alert));
    const timer1 = setTimeout(() => {
      dispatch(dismissAlert(alert.id));
      timer2 = setTimeout(() => {
        dispatch(removeAlert(alert.id));
      }, 1000);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  /**
   * Creates, dismiss and remove an ERROR alert
   * @param {string} message
   * @param {SupportedLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createErrorAlert = async (message: string, dispatch: any) => {
    const alert = {
      id: useId(),
      severity: AlertSeverity.ERROR,
      message,
      dismiss: false,
    } as CustomAlert;
    await this.createAlert(alert, dispatch);
  };

  /**
   * Creates, dismiss and remove an SUCCESS alert
   * @param {string} message
   * @param {SupportedLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createSuccessAlert = async (message: string, dispatch: any) => {
    const alert = {
      id: useId(),
      severity: AlertSeverity.SUCCESS,
      message,
      dismiss: false,
    } as CustomAlert;
    await this.createAlert(alert, dispatch);
  };

  /**
   * Creates, dismiss and remove an INFO alert
   * @param {string} message
   * @param {SupportedLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createInfoAlert = async (message: string, dispatch: any) => {
    const alert = {
      id: useId(),
      severity: AlertSeverity.INFO,
      message,
      dismiss: false,
    } as CustomAlert;
    await this.createAlert(alert, dispatch);
  };
}

export default AlertUtils;