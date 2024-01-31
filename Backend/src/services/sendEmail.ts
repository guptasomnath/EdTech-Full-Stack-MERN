import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { vefifyEmailBodyDesign, passwordResetEmailBodyDesign } from '../utils/mailGen';
import { getHostUrl } from '../utils/getHostUrl';
import { pendingVerifyMailList } from "../utils/pendingVerifyMailList"


const setUpEmail = (email : string) => {
  const MY_EMAIL = process.env.MY_EMAIL;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MY_EMAIL,
      pass: EMAIL_PASSWORD
    }
  });

   const mailOptions = {
     from : "sampleemail@gmail.com",
     to : "testgmail@gmail.com",
     subject : "Online Education Verify Email",
     html : "This is sample email"
   }
 
   mailOptions.from = MY_EMAIL;
   mailOptions.to = email;

   return {mailOptions, transporter };

}

export const sendVerifyEmail = (email : string) => {
  
  const {mailOptions, transporter} = setUpEmail(email);
  mailOptions.subject = "Online Education Verify Email";

  const unicID = uuidv4();
  pendingVerifyMailList.set(unicID, email);

  mailOptions.html = vefifyEmailBodyDesign(getHostUrl() + "/api/v1/users/verify/" + unicID);

  return transporter.sendMail(mailOptions);
  
}

export const sendPasswordResetEmail = (email : string) => {

  const {mailOptions, transporter} = setUpEmail(email);
  mailOptions.subject = "Online Education Password Reset Email";
  
  const unicID = uuidv4();
  pendingVerifyMailList.set(unicID, email);

  mailOptions.html = passwordResetEmailBodyDesign(getHostUrl() + "/api/v1/users/resetpassword/" + unicID);
  return transporter.sendMail(mailOptions);

}