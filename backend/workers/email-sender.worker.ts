import nodemailer from 'nodemailer';
import logger from '../logger';
import Email from '../models/email.model';

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

  transporter.sendMail(job.data).then((info) => {
    // log to the db
    const emailInfo = {
      error: '',
      data: job.data,
      successInfo: info,
    };
    Email.create(emailInfo).catch((err) => {
      logger.error(`error logging email to db. Email WAS SUCCESSFULLY SENT, only logging to db failed: ${err}`);
    });
  }).catch((err) => {
    logger.error(`send email failed: ${err}`);
    // log to the db
    const emailInfo = {
      error: err,
      data: job.data,
      successInfo: null,
    };
    Email.create(emailInfo).catch((e) => {
      logger.error(`error logging email to db. Email failed to send AND logging to db failed: ${e}`);
    });
  });
}

export default emailSenderWorker;
