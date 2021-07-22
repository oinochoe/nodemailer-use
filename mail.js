const nodemailer = require('nodemailer');

module.exports = async (req, res, next) => {
    const { email, title, desc, username } = req.body;
    // transporter
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        });

        // message
        let message = {
            from: process.env.GOOGLE_MAIL,
            to: `${username}<${email}>`,
            subject: title,
            html: `<div // 메일 본문 -> html을 이용해 꾸며서 보낼수 있다
                    style='
                    text-align: center;
                    width: 50%;
                    height: 60%;
                    margin: 15%;
                    padding: 20px;
                    box-shadow: 1px 1px 3px 0px #999;
                    '>
                    <h2>${username} 님, 안녕하세요.</h2> <br/> <h2>제목: ${title}</h2> <br/>${desc} <br/><br/><br/><br/></div>`,
        };

        transporter.sendMail(message, (err) => {
            if (err) next(err);
            else res.status(200).json({ isMailSucssessed: true });
        });
    } catch (err) {
        next(err);
    }
};
