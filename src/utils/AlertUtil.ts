import { v4 as uuid } from 'uuid';
import Alert from '../models/Alert';
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
  static createAlert = async (severity: AlertSeverity, message: string, dispatch: any) => {
    try {
      let timer2: any;
      const newAlert = {
        id: uuid(),
        severity,
        message,
        dismiss: false,
      } as Alert;

      dispatch(createAlert(newAlert));
      const timer1 = setTimeout(() => {
        dispatch(dismissAlert(newAlert.id));
        timer2 = setTimeout(() => {
          dispatch(removeAlert(newAlert.id));
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
}

export default AlertsUtil;
