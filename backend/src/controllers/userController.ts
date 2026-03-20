// Contains logic for user related routes, such as getting user info, updating user info, etc.

import { Request, Response } from "express";
import { User } from "../models/users";
import bcrypt from "bcrypt";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", async (request: Request, response: Response) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
  });
  response.json(users);
});

userRouter.post("/", async (request: Request, response: Response) => {
  const { username, password, role } = request.body;

  if (!username || !password) {
    response
      .status(400)
      .json({ error: "please enter username, password, and email" });
    return;
  }

  const saltRounds = 11;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username: username,
    passwordHash: passwordHash,
    role: role,
  });

  const { passwordHash: _passwordHash, ...safeUser } = user.toJSON();
  response.status(201).json(safeUser);
});

export default userRouter;
