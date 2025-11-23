// Defines Custom error class to be used
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    // The Error class has a default error stack
    if (stack) {
      // If present take that stack
      this.stack = stack;
    } else {
      // Otherwise create one
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
