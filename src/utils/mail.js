import Mailgen from "mailgen";

const emailVerificationMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Hello There! General Kenobi We have been waiting for you",
      action: {
        instruction:
          "Click on the following button to become Obi Wan's Padawan",
        button: {
          color: "#22bc66",
          text: "Become Padawan",
          link: verificationURL,
        },
      },

      outro:
        "Need Help, or have questions? Just Reply to this email we love to help a fellow Jedi",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "We heard you forgot your Jedi Passcode!",
      action: {
        instruction: "Click the following button to reset you password",
        button: {
          color: "#22bc66",
          text: "Change Passcode",
          link: passwordResetURL,
        },
      },

      outro:
        "Need Help, or have questions? Just Reply to this email we love to help a fellow Jedi",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
