const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {

    await transporter.verify();
    console.log("SMTP Ready");

    const info = await transporter.sendMail({
      from: `AerthX <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return info;

  } catch (error) {
    console.error("SMTP ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;