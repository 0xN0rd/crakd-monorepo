import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const nodemailerMailgun = nodemailer.createTransport(
    mg({
        host: 'api.eu.mailgun.net',
        auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
        },
    })
);

export const sendEmail = ({ to, subject, html }) => {
    return new Promise((resolve, reject) => {
        if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
            console.log('You need to provide MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables for sending emails.');
            return resolve('An error ocurred while sending an email: (Credentials missing).');
        }

        nodemailerMailgun.sendMail(
            {
                from: 'Crakd <no-reply@crakd.gg>',
                to,
                subject,
                html,
            },
            function (err, info) {
                if (err) {
                    console.log('An error occurred while sending an email: ', err);
                } else {
                    return resolve(info);
                }
            }
        );
    });
};
