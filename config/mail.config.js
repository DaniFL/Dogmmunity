const mail = {
    user:"dogmmunityapp@gmail.com",
    pass:"miscojonesenvinagre",
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls:{
    rejectUnathorized: false
  },
  secure: false, // true for port 465, false for other ports
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: 'Dogmunity <${ mail.user }>', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hello world?", // plain text body
            html, // html body
        });
    }catch (error) {
        console.log("Error sending email", error);
    }
}

const getTemplate = (name, token) => {
    return `
    <head> 
        <link rel="stylesheet" href="../public/css/styless.css">
    </head>

        <div class="container">
            <h1>¡Bienvenido a Dogmunity ${ name}!</h1>
            <p>Gracias por registrarte en Dogmunity. Para completar tu registro, haz click en el siguiente enlace:</p>
            <a href="http://localhost:3000/api/user/verify/${token}">Verificar cuenta</a>
        </div>
    `;
}

module.exports = {
    sendEmail,
    getTemplate
}