const ejs = require("ejs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.nodemailer_email,
		pass: process.env.nodemailer_password,
	},
});

function sendMail(templateFilePath, data, sendTo, subject) {
	ejs.renderFile(templateFilePath, data)
		.then(async (html) => {
			console.log("Sending Mail...");
			const info = await transporter.sendMail({
				from: `"Rishi 👻" <${process.env.nodemailer_email}>`,
				to: sendTo,
				subject: subject,
				html,
			});
			console.log("Message sent: %s", info.messageId);
		})
		.catch((err) => {
			console.log(err);
			console.log("Message not sent");
		});
}

module.exports = { sendMail };
