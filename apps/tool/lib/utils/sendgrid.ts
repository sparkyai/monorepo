import type { MailDataRequired } from "@sendgrid/mail";
import sendgrid from "@sendgrid/mail";
import { env } from "@sparky/env";

sendgrid.setApiKey(env("SENDGRID_API_KEY"));

export async function sendEmail(payload: Omit<MailDataRequired, "from">) {
  const data = payload as MailDataRequired;
  data.from = env("SENDER_EMAIL");

  return sendgrid.send(data);
}
