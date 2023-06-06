import { Request, Response } from "express";
import { IUserModel } from "../../models/user/interfaceIUserModel";
import User from "../../models/user/User";
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

export default {
  async login(req: Request, res: Response) {
    try {
      const { userEmail, userPassword }: IUserModel = req.body;

      if (!userEmail || !userPassword) {
        return res.status(400).json({ message: "Preencha os campos corretamente" });
      }

      const user = await User.findOne({ userEmail });

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado!" });
      }

      const validPassword = await bCrypt.compare(userPassword, user.userPassword);

      if (!validPassword) {
        return res.status(400).json({ message: "Email ou senha incorretos!" });
      }

      const token = jwt.sign(
        {
          email: user.userEmail,
        },
        process.env.JWT_KEY!,
        {
          expiresIn: "48h",
        }
      );

      return res.send({
        userEmail: user.userEmail,
        _id: user._id,
        userName: user.userName,
        token: token,
      });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
  }
};
