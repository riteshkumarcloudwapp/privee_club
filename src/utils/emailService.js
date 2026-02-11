import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailSMTP = async ({ to, name, otp }) => {
  try {
    // 1️⃣ Read template file
    const source = fs.readFileSync("templates/otpEmail.hbs", "utf8");

    // 2️⃣ Compile template
    const template = handlebars.compile(source);

    const htmlToSend = template({
      name,
      otp,
      year: new Date().getFullYear(),
    });

    // 3️⃣ Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Email Verification - Privee",
      html: htmlToSend,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: error.message };
  }
};
