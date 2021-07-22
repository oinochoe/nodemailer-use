const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
    },
});

const message = {
    from: process.env.GOOGLE_MAIL,
    to: `${process.env.MAIL_NAME}<${process.env.MAIL_ADDRESS}>`,
    subject: process.env.MAIL_TITLE,
    html: `<div // 메일 본문 -> html을 이용해 꾸며서 보낼수 있다
            style='
            text-align: center;
            width: 50%;
            height: 60%;
            margin: 15%;
            padding: 20px;
            box-shadow: 1px 1px 3px 0px #999;
            '>
            <h2>${process.env.MAIL_NAME} 님, 안녕하세요.</h2> <br/> <h2>제목: ${process.env.MAIL_TITLE}</h2> <br/>${process.env.MAIL_DESC} <br/><br/><br/><br/></div>`,
};

transporter.sendMail(message, (err) => {
    if(err) console.error(err);
    else res.status(200).json({ isMailSucssessed: true });
});