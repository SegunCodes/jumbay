const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_PROVIDER,
    port: process.env.SERVICE_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

exports.sendEmail = async (email, data) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: data.subject,
            text: data.text,
            html: data.html
        })
        console.log(`message sent: ${info}`)
    } catch (error) {
        console.error(error)
    }
}