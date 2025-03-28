import * as MailComposer from 'expo-mail-composer';
import { EMAIL_RECIPIENTS } from '@env';

export const sendMail = async (filePath: string) => {
  try {
    const mailOptions = {
      subject: 'Sales Records CSV',
      recipients: [EMAIL_RECIPIENTS],
      body: '<b>Attached is the CSV file of sales records.</b>',
      isHtml: true,
      attachments: [filePath],
    };

    const result = await MailComposer.composeAsync(mailOptions);
    
  } catch (error) {
    throw error;
  }
};