/**
 * asyncHandler
 * ------------
 * A utility function that wraps asynchronous Express route handlers and middleware.
 *
 * Express does not automatically catch errors thrown in async functions.
 * Without this wrapper, you would need a try/catch in every async route.
 *
 * This function:
 * - Executes the provided request handler (which is usually async)
 * - Wraps it inside Promise.resolve()
 * - Automatically catches any rejected promise or thrown error
 * - Passes the error to Express’s next() function so the global error
 *   handling middleware can take over
 *
 * Usage:
 * app.get('/route', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
