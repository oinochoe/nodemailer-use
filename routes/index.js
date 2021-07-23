var express = require('express');
var router = express.Router();

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;

router.get('/email/template', (req, res, next) => {
    MailConfig.ViewOption(gmailTransport, hbs);
    let HelperOptions = {
        from: 'copstyle86@gmail.com',
        to: 'copstyle@naver.com',
        subject: 'Hellow world!',
        template: 'test',
        context: {
            name: '나는',
            email: '킴',
            address: '영민',
        },
    };
    gmailTransport.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json(error);
        }
        console.log('email is send');
        console.log(info);
        res.json(info);
    });
});

module.exports = router;
