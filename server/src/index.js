require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const PORT = 5050 || process.env.PORT;

app.use(express.json());
app.use(cors());

// https://mailtrap.io/
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: `${process.env.AUTH_USER}`,
    pass: `${process.env.AUTH_PASSWORD}`,
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

// https://nodemailer.com/
app.post("/send-email", async (req, res) => {
  try {
    const { mail } = req.body;
    const info = await transporter.sendMail({
      from: `"Stak" <${process.env.EMAIL_OWNER}>`,
      to: `${mail}`,
      subject: "Thank you for subscribing",
      text: "Thank you for subscribing, we will update the latest news <3",
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      info,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ err: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log("Server run on port", PORT);
});
