/** A model for Error details for logging purposes */
type ErrorDetail = {
    /** The component that that caught the error. */
    component: string,

    /** The action that was running when the error was caught. */
    action: string,

    /** The action that was running when the error was caught. */
    requestName?: string
}

export default ErrorDetail;
