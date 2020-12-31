const nodemailer = require('nodemailer');




let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'neutrino.web.study@inbox.ru',
            pass: 'Neytrino121'
        }
    });
    

const mailer = message =>{
  transporter.sendMail(message, (err,info) =>{
    if(err){
      console.log(err)
    }
    console.log('email sent: ' + info)
  }
)};


module.exports = mailer; 