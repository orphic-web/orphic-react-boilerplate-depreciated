enum ErrorCodes {
  // The operation was cancelled (typically by the caller).
  CANCELLED = 'cancelled',
  // Unknown error or an error from a different error domain.
  UNKNOWN = 'unknown',
  // Indicates arguments that are problematic regardless of the state of the system
  INVALID_ARGUMENT = 'invalid-argument',
  // Deadline expired before operation could complete.
  DEADLINE_EXCEEDED = 'deadline-exceeded',
  // Some requested document was not found.
  NOT_FOUND = 'not-found',
  // Some document that we attempted to create already exists.
  ALREADY_EXISTS = 'already-exists',
  // The caller does not have permission to execute the specified operation.
  PERMISSION_DENIED = 'permission-denied',
  // Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.
  RESSOURCE_EXHAUSTED = 'resource-exhausted',
  // Operation was rejected because the system is not in a state required for the operation's execution.
  FAILED_PRECONDITION = 'failed-precondition',
  // The operation was aborted, typically due to a concurrency issue like transaction aborts, etc.
  ABORTED = 'aborted',
  // Operation was attempted past the valid range.
  OUT_OF_RANGE = 'out-of-range',
  // Operation is not implemented or not supported/enabled.
  UNIMPLEMENTED = 'unimplemented',
  // Means some invariants expected by underlying system has been broken. If you see one of these errors, something is very broken.
  INTERNAL = 'internal',
  // The service is currently unavailable.
  UNAVAILABLE = 'unavailable',
  // Unrecoverable data loss or corruption.
  DATA_LOSS = 'data-loss',
  // The request does not have valid authentication credentials for the operation.
  UNAUTHENTICATED = 'unauthenticated',
}
export default ErrorCodes;
