import type { SendVerificationRequestParams } from 'next-auth/providers/email';
import { config } from 'dotenv';
import { Resend } from 'resend';
import WelcomeEmail from '@/components/email/Welcome';

config({ path: '.env' });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { error } = await resend.emails.send({
      from: 'KnowOne <hello@knowone.ai>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function sendWelcomeEmail(email: string, key: string, language: string) {
  try {
    const { error } = await resend.emails.send({
      from: 'KnowMore <hello@knowone.ai>',
      to: email,
      subject: 'Welcome to KnowOne.AI',
      react: WelcomeEmail({ email, key, language }),
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier: email, url } = params;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: 'KnowOne <hello@knowone.ai>',
      to: email,
      subject: 'Login Link to your Account',
      html: `<p>Click the magic link below to sign in to your account:</p>\
             <p><a href="${url}"><b>Sign in</b></a></p>`,
    });
  } catch (error) {
    console.log({ error });
  }
};
