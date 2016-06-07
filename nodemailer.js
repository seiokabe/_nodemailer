'use strict';

// Conf.json example
//
// {
//   "SMTP": {
//     "host": "localhost",
//     "port": 25
//   },
//   "Message": {
//       "from"   : "Node Mailer <foge@xxx.jp>",
//       "to"     : "foo@example.com",
//       "subject": "Nodemailer Test. AAAAAA",
//       "text"   : "Hello to myself! AAAAA"
//   }
// }
//

var Conf  = require("./Conf.json");
var error = console.error
var log   = console.log;
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var SMTP = Conf.SMTP;

var transport = nodemailer.createTransport(smtpTransport({
    host: SMTP.host,
    port: SMTP.port
}));

var message = Conf.Message;

transport.sendMail(message, function(err, success) {
    if (err) {
        error(err);
    } else {
        log("Message sent: " + success.response);
    }
    transport.close();
});
return;
