import { createTransport, Transporter } from "nodemailer";
import { mailAdmin, apiPassword, originURL } from "../config/config";

const transporter: Transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: mailAdmin,
    pass: apiPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendUserMail = async (
  user: string,
  name: string,
  lastname: string,
  email: string,
	password: string,
): Promise<void> => {
  try {
    const mailOptions = {
      from: mailAdmin,
      to: email,
      subject: "Nuevo registro",
      html: 
			`<h2>¡Bienvenido/a a la App de Notas!</h2>
			<p>Estimado/a ${name},</p>
			<p>A partir de ahora, podrás crear, editar y organizar tus notas de manera sencilla y eficiente.</p>
			<p>A continuación, te proporciono los detalles de tu cuenta:</p>
			<ul>
				<li><strong>Nombre de usuario:</strong> ${user}</li>
				<li><strong>Correo electrónico:</strong> ${email}</li>
				<li><strong>Contraseña:</strong> ${password}</li>
				<li><strong>Nombre:</strong> ${name}</li>
				<li><strong>Apellido:</strong> ${lastname}</li>
			</ul>
			<p>Te recomiendo mantener estos datos en un lugar seguro y no compartir tu contraseña con nadie.</p>
			<p>Atentamente,</p>
			<strong><p>Mariano López</p></strong>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};

export const sendPasswordMail = async (email: string, token: string): Promise<void> => {
  try {
    const mailOptions = {
      from: mailAdmin,
      to: email,
      subject: "Nuevo registro",
      html: 
			`<p>Hola,</p>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${originURL}/reset-password/${token}">Restablecer contraseña</a>
      <p>Este link expirará dentro de una hora, si no solicitaste restablecer tu contraseña, ignora este correo.</p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};


