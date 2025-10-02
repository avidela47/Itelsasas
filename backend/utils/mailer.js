// /utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp-mail.outlook.com",
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_SECURE === "true" ? true : false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "Ecommerce"}" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("📧 Mail enviado a:", to);
  } catch (err) {
    console.error("❌ Error enviando mail:", err.message);
  }
};
