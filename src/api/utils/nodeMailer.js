const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD
  }
});

transport.verify().then((res) => console.log(res));

function forgotPasswordMailing(email, otp) {
  transport
    .sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: `Otp to reset password in Simplify website`,
      html: `<p>This is system generated OTP to reset your password in <b>Simplify</b>.</p>
        <h3>OTP: ${otp}</h3>`
    })
    .then((response) => {})
    .catch((err) => console.log(err.message));
}
function completedOrderMailing(titleOfOrder, email) {
  transport
    .sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: `Order completed editin`,
      html: `<p>Your order of title ${titleOfOrder} has been completed editing, please visit office to take the order</p>`
    })
    .then((response) => {})
    .catch((err) => console.log(err.message));
}

module.exports = { forgotPasswordMailing, completedOrderMailing };
