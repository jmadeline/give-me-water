const { sendMail } = require('../sendMail');

const notify = () => {
  sendMail(`Hello world ${counter}`, "this is email body it can contain html also");
  counter++;
}

module.exports = notify;
