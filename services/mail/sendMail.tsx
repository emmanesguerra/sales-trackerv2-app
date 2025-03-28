import * as MailComposer from 'expo-mail-composer';

export const sendMail = async (filePath: string) => {
  try {
    const mailOptions = {
      subject: 'Sales Records CSV',
      recipients: [''],
      body: '<b>Attached is the CSV file of sales records.</b>',
      isHtml: true,
      attachments: [filePath],
    };

    const result = await MailComposer.composeAsync(mailOptions);

    if (result.status === 'sent') {
      console.log('Email sent successfully');
    } else {
      console.log('Email sending failed');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};