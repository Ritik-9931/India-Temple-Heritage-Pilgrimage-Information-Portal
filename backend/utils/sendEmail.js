import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email service is not configured. Set EMAIL_USER and EMAIL_PASS.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // timeouts to avoid hanging requests in production
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    // verify connection/configuration before attempting to send
    await transporter.verify();
  } catch (err) {
    console.error("Email verify failed:", err);
    throw new Error("Unable to connect to SMTP server: " + (err.message || err));
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info && info.messageId ? info.messageId : info);
  } catch (err) {
    console.error("sendMail failed:", err);
    throw new Error("Email send failed: " + (err.message || err));
  }
};

export default sendEmail;
