const nodemailer = require('nodemailer');




let transporter = nodemailer.createTransport({
        host: 'smtp.inbox.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'u login?',
            pass: 'u pass?'
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