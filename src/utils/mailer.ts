import nodemailer, { TestAccount, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const mailer: {
    account?: TestAccount,
    transporter?: Transporter<SMTPTransport.SentMessageInfo>,
} = {
    account: undefined,
    transporter: undefined,
}

type MailOption = {
    to: string,
    subject?: string,
    text?: string,
    html?: string,
}

export const sendMail = async (option: MailOption) => {
    try {
        if (!mailer.account)
            mailer.account = await nodemailer.createTestAccount();
        if (!mailer.transporter)
            mailer.transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",// process.env.EMAIL_HOST
                port: 587,// process.env.EMAIL_PORT
                secure: false,
                auth: {
                    user: mailer.account.user,// process.env.EMAIL
                    pass: mailer.account.pass,// process.env.EMAIL_PASSWORD
                }
            });

        await mailer.transporter.sendMail({
            from: "<foo@example.com>",// process.env.EMAIL
            ...option
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}