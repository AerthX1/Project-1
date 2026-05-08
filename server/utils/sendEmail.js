const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},
connectionTimeout: 10000,
greetingTimeout: 10000,
socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"AerthX 🌱" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendEmail; 