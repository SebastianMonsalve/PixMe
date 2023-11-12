import User from "../models/User.js";
import bcrypt from "bcrypt";
import { transporter } from "../libs/nodemailer.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, images } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: passwordHash,
      images: images,
    });

    if (password !== confirmPassword)
      return res.send("Las contraseñas deben coincidir");
    const userCreated = await newUser.save();

    const sendEmail = `
    <p>hola ${userCreated.name}</p>
    <a href="http://localhost:5173/login">Comenzar</a>`;
    const info = await transporter.sendMail({
      from: '"PixMe Welcome" <pixmerecovery@gmail.com>',
      to: `${userCreated.email}`,
      subject: "Welcome",
      html: sendEmail,
    });

    return res.send(userCreated);
  } catch (error) {
    return res.send("Correo ya registrado");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.find({ email }).populate("images").exec();
    if (userFound.length === 0) return res.send("Not found");
    const isMatch = await bcrypt.compare(password, userFound[0].password);
    if (!isMatch) return res.send("Not found");
    return res.send(userFound);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find().populate("images").exec();
    if (user.length > 0) {
      return res.send(user);
    } else {
      return res.send("Not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    let Password = null;
    let userUpdate = null;
    if (password) {
      Password = await bcrypt.hash(password, 10);
      userUpdate = {
        name: name,
        password: Password,
      };
    } else {
      userUpdate = { name: name };
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      userUpdate,
      {
        new: true,
      }
    );
    return res.send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    if (!userDeleted) return res.send(500);
    return res.send(userDeleted);
  } catch (error) {
    console.log(error);
  }
};

export const getUserRecovery = async (req, res) => {
  const code = Math.floor(10000 + Math.random() * 90000);
  try {
    const { email } = req.body;
    const userEmail = await User.findOne({ email: email });
    const sendEmail = `
      <h1 style="padding: 20px; background-color: #D1272E; color: white; text-align: center; font-size: 30px;">PIXME</h1>
      <h3 style="padding: 0 40px; color: black";>Hola ${userEmail.name},</h3>
      <p style="padding: 0 40px; color: black";>Hemos recibido una solicitud para usar esta dirección de correo electrónico como método de recuperación de contraseña para la cuenta asociada a este correo. </p>
      <h1 style="padding: 0 40px; text-align: center; font-size: 30px;">${code}</h1>
      <p style="padding: 0 40px; color: black";>Deberás ingresar este código en la página habilitada específicamente para esta función. Una vez que ingreses el código correctamente, podrás continuar con el proceso de recuperación de tu cuenta. <br> <br>
        En caso de que no hayas solicitado este código o no reconozcas esta solicitud, por favor ignora este mensaje por motivos de seguridad. <br> <br>
        Atentamente, <br>
        El Equipo de PixMe</p>
    `;
    const info = await transporter.sendMail({
      from: '"PixMe Recovery" <pixmerecovery@gmail.com>',
      to: `${userEmail.email}`,
      subject: "Recovery Password",
      html: sendEmail,
    });
    return res.send({ code: code, user: userEmail });
  } catch (error) {
    return res.send("Correo no existente");
  }
};

export const RecoveryPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.send("Not found");
    const passwordHash = await bcrypt.hash(password, 10);
    const newPassword = {
      password: passwordHash,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      newPassword,
      {
        new: true,
      }
    );
    return res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
