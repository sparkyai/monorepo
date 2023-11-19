import type { MailDataRequired } from "@sendgrid/mail";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);

export async function sendEmail(payload: Omit<MailDataRequired, "from">) {
  const data = payload as MailDataRequired;
  data.from = `${process.env.SENDER_EMAIL}`;

  return sendgrid.send(data);
}
