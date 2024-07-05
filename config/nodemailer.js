// config/nodemailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  // port: 8081,
  // secure: false,
  // logger: true,
  // debug: true,
  secureConnection: false,
  auth: {
    user: "rawadmall.info@gmail.com",
    pass: "epjg pkpu kiaf uoes",
  },
  tls: {
    rejectAuthorized: true,
  },
});
export default transporter;
