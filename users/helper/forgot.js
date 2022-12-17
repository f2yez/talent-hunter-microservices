// const res = require("express/lib/response");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const forgotEmail = async (email, token) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2b030075fbfbd0",
        pass: "76ab5be8172ffe",
      },
    });
    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };

    transport.use("compile", hbs(handlebarOptions));
    let info = await transport.sendMail({
      from: "2b030075fbfbd0",
      to: `${email}`,
      subject: "Hello ✔",
      template: "forgot",
      context: {
        link: `http://localhost:3000/changePassword/${token}`,
      },
    });
    //
    console.log("Message sent: %s", info.messageId);
    //
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  forgotEmail,
};
