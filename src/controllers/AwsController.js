const nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

class AwsController {
  constructor() {
    this.ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "sa-east-1",
      defaultProvider,
    });

    this.transporter = nodemailer.createTransport({
      SES: { ses: this.ses, aws },
    });

    this.sendMail = this.sendMail.bind(this);
  }

  async sendMail(req, res) {
    const { to, subject, html, text } = req.body;

    let info = await this.transporter.sendMail(
      {
        from: "felipecarvalhogodoi98@gmail.com",
        to,
        subject,
        text,
        html,
      },
      (err, info) => {
        if (err) {
          console.log(err, info);
        }
      }
    );

    res.json({
      message: "Email send",
    });
  }
}

module.exports = new AwsController();
