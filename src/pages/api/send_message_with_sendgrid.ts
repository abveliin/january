import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type Data = {
  success: boolean;
};

interface I_handler {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // const body = JSON.parse(req.body);
    const { name, email, subject, message }: I_handler = req.body;

    console.log("requesty body values", req.body);

    const msg = {
      to: "abvelin.com@gmail.com",
      from: "abvelin.com@gmail.com",
      subject: subject,
      sender: `${name.toUpperCase()} sent you a message`,
      text: `Email => ${email}`,
      html: `<strong>${message}</strong>`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ success: true });
      console.log("we succeed to send mail");
    } catch (error) {
      res.status(200).json({ success: false });
      console.log("erreur de verification");
    }
  }
}

//export { send_message_with_sendgrid };
