import { v4 as uuid } from 'uuid';
import CustomAlert from '../models/CustomAlert';
import AlertSeverity from '../models/enums/AlertSeverity';
import { createAlert, dismissAlert, removeAlert } from '../store/slices/AlertSlice';

class AlertsUtil {
  /**
   * Creates, dismiss and remove an alert
   * @param {AlertSeverity} severity
   * @param {string} message
   * @param {any} dispatch
   * @returns {void}
   */
  private static createAlert = async (alert: CustomAlert, dispatch: any) => {
    try {
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
    } catch (e: any) {
      console.log(e);
      return e;
    }
  };

  /**
   * Creates, dismiss and remove an ERROR alert
   * @param {string} message
   * @param {AvailableLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createErrorAlert = async (message: string, dispatch: any) => {
    try {
      const alert = {
        id: uuid(),
        severity: AlertSeverity.ERROR,
        message,
        dismiss: false,
      } as CustomAlert;
      await this.createAlert(alert, dispatch);
    } catch (e: any) {
      console.log(e);
    }
  };

  /**
   * Creates, dismiss and remove an SUCCESS alert
   * @param {string} message
   * @param {AvailableLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createSuccessAlert = async (message: string, dispatch: any) => {
    try {
      const alert = {
        id: uuid(),
        severity: AlertSeverity.SUCCESS,
        message,
        dismiss: false,
      } as CustomAlert;
      await this.createAlert(alert, dispatch);
    } catch (e: any) {
      console.log(e);
    }
  };

  /**
   * Creates, dismiss and remove an INFO alert
   * @param {string} message
   * @param {AvailableLanguages} language
   * @param {any} dispatch
   * @returns {void}
   */
  static createInfoAlert = async (message: string, dispatch: any) => {
    try {
      const alert = {
        id: uuid(),
        severity: AlertSeverity.INFO,
        message,
        dismiss: false,
      } as CustomAlert;
      await this.createAlert(alert, dispatch);
    } catch (e: any) {
      console.log(e);
    }
  };
}

export default AlertsUtil;
