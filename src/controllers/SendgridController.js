const sgMail = require("@sendgrid/mail");

class SendgridController {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    this.sendMail = this.sendMail.bind(this);
  }

  async sendMail(req, res) {
    const { to, subject, html, text } = req.body;

    const msg = {
      to,
      from: "felipecarvalhogodoi98@gmail.com",
      subject,
      text,
      html,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.json({
          message: "Email send",
        });
      })
      .catch((error) => {
        res.json({
          message: "Error",
        });
      });
  }
}

module.exports = new SendgridController();
