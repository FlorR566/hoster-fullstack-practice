import { transport } from "../config/nodemailer"

type EmailType ={
    name:string
    email:string
    token:string
}

export class AuthEmail{
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com',
            to: user.email,
            subject: 'CashTracker - confirma tu email',
            html:`
                <p>Hola: ${user.name}, has creado tu cuenta en CashTracker </p>
                <p> Visista el siguiente enlace:</p>
                <a href="#"> Confirmar cuenta</a>
                <p> e ingresa el codigo <b>${user.token}</b></p>
            `
        })

        console.log('Mensaje enviado', email.messageId)
    }

    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com',
            to: user.email,
            subject: 'CashTracker - Restablece tu Password',
            html:`
                <p>Hola: ${user.name}, Has solicitado restablecer tu Password </p>
                <p> Visista el siguiente enlace:</p>
                <a href="#"> Restablece tu Password</a>
                <p> e ingresa el codigo <b>${user.token}</b></p>
            `
        })

        console.log('Mensaje enviado', email.messageId)
    }
}