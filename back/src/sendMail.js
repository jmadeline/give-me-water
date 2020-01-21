const nodemailer = require('nodemailer');
const mailing = "tallhula1989@gmail.com";
const senderEmail = "madelinejoubert44@gmail.com";
const senderPassword = "gkaragcdddrquics"; // gmail app password
module.exports = {
  sendMail: async (subject, text, to = mailing) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      const message = {
        from: `report sender <${senderEmail}>`,
        to,
        subject,
        text: subject,
        html: text,
      };

      transporter.sendMail(message, () => { });
    } catch (e) {
      // handle errors here
      throw (e);
    }
  },
};