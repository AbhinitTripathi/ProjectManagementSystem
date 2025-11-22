import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTexual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTexual,
    html: emailHTML,
  };

  try {
    await transporter.sendEmail(mail);
  } catch (error) {
    console.error(
      "Email service failed. Make sure Mail Trap credentials are in .env",
    );
    console.error("Error: ", error);
  }
};

// Function to generate verification email content
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

// Function to generate password reset content
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

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
