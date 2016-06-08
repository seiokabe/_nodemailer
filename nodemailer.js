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
var Conf;
var error = console.error
var log   = console.log;
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var fs    = require('fs');
var path  = require("path")
var argv  = require('argv');

var scriptname = ( process.argv[ 1 ] || '' ).split( '/' ).pop();

argv.option([
  {
    name: 'Conf',
    short: 'C',
    type : 'string',
    description :'Use alternate configuration file.',
    example: "'"+scriptname+" -C xxxx.json'"
  }
]);

var args = argv.run();
var opt  = args.options;

if ( opt["help"] ){
  argv.help();
  process.exit(0);
}

if (typeof opt["Conf"] === 'undefined') Conf = require("./Conf.json");
else {
  var file = opt["Conf"];
  try {

    var stats = fs.statSync(file);
    Conf = require(file);
    log("load Confing file: ", file)

  } catch(e) {

    try {
      file = './' + file;
      var stats = fs.statSync(file);
      Conf = require(file);
      log("load Confing file: ", file)
    } catch(e) {
      return error("Error: Conf is not found.");
    }

  }
}

// log("typeof Conf: %s", typeof Conf);
// log("Conf: %s", JsonString(Conf));

if( typeof Conf !== 'object' ) return error("Error: Conf is not Object.");

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

function JsonString(obj) {
  return JSON.stringify(obj, null, "    ");
}
