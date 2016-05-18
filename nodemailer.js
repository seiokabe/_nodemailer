var error = console.error
var log   = console.log;
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    host: "localhost",
    port: 25
    //host: "ms.nexia.jp",
    //port: 25
}));

var message = {
    from: 'Node Mailer <nexia@soy.nexia.jp>',
    to: 'test05@nxa.jp',
    subject: "Nodemailer Test. AAAAAA",
    text: "Hello to myself! AAAAAAAAA"
};

transport.sendMail(message, function(err, success) {
    if (err) {
        error(err);
    } else {
        log("Message sent: " + success.response);
    }
    transport.close();
});
return;

