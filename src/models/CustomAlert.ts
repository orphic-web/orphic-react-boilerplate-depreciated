type CustomAlertType = {
    id: string,
    message: string,
    severity: 'error' | 'success' | 'info',
    dismiss: boolean,
}

export default CustomAlertType;
