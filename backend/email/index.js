const mailer = require('nodemailer');

let transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "hexagrammers@gmail.com", // generated ethereal user
        pass: "r%uRbffjbpce57U=", // generated ethereal password
    },
});

exports.sendEmail = async (to, subject, message) => {
    var mailOptions = {
        from: "hexagrammers@gmail.com",
        to,
        subject,
        text: message
    }
    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent")
        }
    });
}