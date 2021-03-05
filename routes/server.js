var express = require('express');
var router = express.Router();

  var  nodemailer = require('nodemailer');
  var  bodyParser = require('body-parser');

    var bodyParser = require('body-parser');

    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());

router.post('/send',function(req,res,next){
  var userSession=req.session.theUser;
  const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kaela.mccullough@ethereal.email',
    pass: 'pUmwcTvgnNXp31HsFS'
  },
  tls:{
    rejectUnauthorized:false
  }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Nodemailer Contact" <kaela.mccullough@ethereal.email>', // sender address
    to: 'suramlikhith96@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  if(userSession==undefined){
    res.render('contact', {alert:'You have Succesfully reached to us!!', login:[]});
  }
  else {
    res.render('contact', {alert:'You have Succesfully reached to us!!', firstname:req.session.theUser.FirstName, login:[1]});
  }
});
});

module.exports = router;
