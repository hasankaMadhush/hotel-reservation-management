const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
const config = require('../config');

const sender = config.email;

const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();

  // This transporter is created only for demo purposes
  // may need to get host and other sensitive data from a wallet
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  return transporter;
};

// sends the email
exports.sendMail = async (receiverEmail, subject, content) => {
  const transporter = await createTransporter();
  let info = await transporter.sendMail({
    from: sender,
    to: receiverEmail,
    subject: subject,
    html: content, // html body,
  });

  // shut down the connection pool, no more messages.
  transporter.close();
  console.log('Message sent: %s', info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

exports.sendReservationCompleteMail = (receiver, reservation) => {
  const subject = 'Reservation Successful';
  const content = getContent(receiver, reservation);
  this.sendMail(receiver.email, subject, content);
};

// create the content for the email
const getContent = (receiver, reservation) => {
  const checkIn = dayjs(reservation.checkIn).format('YYYY-MM-DD');
  const checkout = dayjs(reservation.checkout).format('YYYY-MM-DD');
  return `<p>Hi ${receiver.name},</p><h2>Mango Holidays Reservation successful</h2><p>Your stay is from ${checkIn} to ${checkout} with ${reservation.board} for ${reservation.occupancy} occupancy .</p><p>Thank you</p><p>Regards</p><p>Mango Holidays</p>`;
};
