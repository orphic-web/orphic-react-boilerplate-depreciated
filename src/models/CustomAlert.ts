type CustomAlertType = {
    /** Alert unique id */
    id: string,

    /** Alert message */
    message: string,

    /** Alert type */
    severity: 'error' | 'success' | 'info',

    /** Alert display state */
    dismiss: boolean,
}

export default CustomAlertType;
