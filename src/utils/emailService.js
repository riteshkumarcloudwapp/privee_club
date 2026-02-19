import nodemailer from "nodemailer";
import hbs from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmailSMTP = async (to, subject, templateName, data = {}) => {
  try {
    // load & compile template
    const templatePath = path.join(
      __dirname,
      "../templates",
      `${templateName}.html`,
    );

    // to send the data to the template and get the html
    const html = hbs.compile(
      await import("fs").then((fs) => fs.readFileSync(templatePath, "utf8")),
    )(data);

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send mail
    const info = await transporter.sendMail({
      from: `"Privee" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: error.message };
  }
};

export default sendEmailSMTP;
