const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
    const transporter = nodemailer.createTransporter({
        host: process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    }
   

)

const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject:options.subject,
    text: options.text,

}
await transporter.sendMail(mailOptions);
}
module.exports = sendMail