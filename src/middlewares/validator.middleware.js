import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

// Write validator in middleware to catch errors before request reaches server
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // If returned errors is empty, then data is valid
  // We can proceed to the next middleware/route
  if (errors.isEmpty()) return next();

  // Else data is not valid
  const extractedErrors = [];
  errors.array().map((err) =>
    extractedErrors.push({
      [err.path]: err.msg,
    }),
  );
  throw new ApiError(422, "Recieved data is not valid", extractedErrors);
};
