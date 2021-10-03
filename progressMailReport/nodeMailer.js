const nodemailer = require("nodemailer")

const sendMail = async (cred, targetMail, message) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: cred.user,
            pass: cred.pass,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: targetMail,
        subject: message.subject,
        html: message.body
    });

    console.log("Message sent: %s", message.success);
}

module.exports = { sendMail }