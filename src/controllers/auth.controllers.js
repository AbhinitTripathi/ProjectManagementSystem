import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

// Function to generate and save access and refresh tokens
// for the current user
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    // find user in DB by id
    const user = await User.findById(userId);
    // Generate access token for this user
    const accessToken = user.generateAccessToken();
    // Generate refresh token for this user
    const refreshToken = user.generateRefreshToken();

    // We save refresh token in DB as access token is stateless
    user.refreshToken = refreshToken;
    // Save the changes without validation
    // (saves time as we are changing only 1 field)
    await user.save({ validateBeforeSave: false });

    // Return both the access and the refresh token for verification
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Access/Refresh token",
      [],
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Take data from the front end
  // Form data is sent in request body
  const { email, username, password, role } = req.body;

  // Check in DB if the user already exists
  const existingUser = await User.findOne({
    // Return true if email OR username matches
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  // Creates and saves the new user in the MongoDB
  // Fills only the mentioned fields
  // Returns the newly created mongoose document
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  // "user" has the userSchema that has the methods we added
  // for generating tokens
  // generateTemporaryToken return the destructured variables
  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  // For the same user fill the token fields
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    // if user exists ? user.email : undefined
    email: user?.email,
    // Suject that will be sent in the mail body
    subject: "please Verify your email",
    // Content that will be sent in the mail body
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      // This constructs an URL like
      // https://example.com/api/v1/user/verify-email/12345token
      `${req.protocol}://${req.get("host")}/api/v1/user/verify-email/${unhashedToken}`,
    ),
  });

  // Build response to be sent to the client
  // "-something" excludes that field from the returned Document
  const createdUser = await User.findById(user._id).select(
    // Do NOT return the following mentioned fields
    `
    -password
    -refreshToken
    -emailVerificationToken
    -emailVerificationExpiry
    `,
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered and verification email has been sent on your email",
      ),
    );
});

export { registerUser };
