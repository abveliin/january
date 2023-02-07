const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function send_email(req, res) {
  try {
    const body = JSON.parse(req.body);

    console.log("requesty body values", req.body);

    const message = `
    
        Email: ${body.email}\r\n
        Message: ${body.message}
    `;
    const data = {
      to: "abvelin@gmail.com",
      from: "abvelin.mz@gmail.com",
      subject: "New web form message",
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    };

    mail.send(data);
    res.status(200).json({ status: "ok" });
    console.log("we succeed to send mail");
  } catch (error) {
    console.log("erreur de verification");
  }
}
