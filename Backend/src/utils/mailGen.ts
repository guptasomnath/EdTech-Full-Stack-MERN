import MailGenerator from "mailgen";

const forgotPasswordEmail = {
    body: {
      intro: 'Welcome to our Online Education! We\'re very excited to have you on board.',
      action: {
        instructions: 'To reset your password, please click the button below.',
        button: {
          color: '#5D3FD3',
          text: 'Reset Your Password',
          link: 'https://example.com/reset-password'
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

const vefifyEmail = {
  body: {
    intro: 'Welcome to our Online Education! We\'re very excited to have you on board.',
    action: {
      instructions: 'To get started with our service, please click here to verify your email:',
      button: {
        color: '#22BC66',
        text: 'Confirm your account',
        link: 'https://example.com/verify-account'
      }
    },
    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
  }
};

const mailGenerator = new MailGenerator({
    theme: 'default',
    product: {
      name: 'Online Education',
      link: 'https://example.com/',
    }
});

// export const vefifyEmailBody = mailGenerator.generate(vefifyEmail);
export const vefifyEmailBodyDesign = (actionLink : string) => {
    vefifyEmail.body.action.button.link = actionLink;
    return mailGenerator.generate(vefifyEmail);
}


// export const vefifyEmailBody = mailGenerator.generate(vefifyEmail);
export const passwordResetEmailBodyDesign = (actionLink : string) => {
  forgotPasswordEmail.body.action.button.link = actionLink;
  return mailGenerator.generate(forgotPasswordEmail);
}
