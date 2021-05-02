import nodemailer from 'nodemailer';
import logger from '../logger';

async function emailSenderWorker(job: any) {
  const transporter = nodemailer.createTransport({
    host: process.env.emailserver,
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.emailuser,
      pass: process.env.emailpass,
    },
  });

  const mailOptions = {
    from: job.data.from,
    to: job.data.to,
    subject: job.data.subject,
    text: job.data.body,
  };

  transporter.sendMail(mailOptions).then((info) => {
    logger.info(info);
  }).catch((err) => {
    logger.error(`send email failed: ${err}`);
  });

  logger.info(JSON.stringify(job.data));
}

export default emailSenderWorker;
