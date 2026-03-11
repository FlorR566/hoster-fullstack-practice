import { transport } from "../config/nodemailer";

type EmailType = {
	name: string;
	email: string;
	token: string;
};

const CONFIRM_ACCOUNT = "http://localhost:5173/#/confirm-account";
//"https://i006-hoster-fullstack-develop.vercel.app/#/confirm-account";

export class AuthEmail {
	static sendConfirmationEmail = async (user: EmailType) => {
		const email = await transport.sendMail({
			from: "Hoster <admin@hoster.com",
			to: user.email,
			subject: "Hoster - confirma tu email",
			html: `
                <p>Hola: ${user.name}, has creado tu cuenta en Hoster </p>
                <p> Visista el siguiente enlace:</p>
                <a href=${CONFIRM_ACCOUNT}> Confirmar cuenta</a>
                <p> e ingresa el codigo <b>${user.token}</b></p>
            `,
		});
		console.log("Mensaje enviado", email.messageId);
	};

	static sendPasswordResetToken = async (user: EmailType) => {
		const email = await transport.sendMail({
			from: "Hoster <admin@hoster.com",
			to: user.email,
			subject: "Hoster - Restablece tu Password",
			html: `
                <p>Hola: ${user.name}, Has solicitado restablecer tu Password </p>
                <p> Visista el siguiente enlace:</p>
                <a href="#"> Restablece tu Password</a>
                <p> e ingresa el codigo <b>${user.token}</b></p>
            `,
		});
		console.log("Mensaje enviado", email.messageId);
	};
}
