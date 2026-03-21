// Contains logic for user related routes, such as getting user info, updating user info, etc.

import { Request, Response } from "express";
import { User } from "../types/userTypes";
import bcrypt from "bcrypt";

export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    response.json(users);
  }
  catch (error) {
    response.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { username, password, role } = request.body;

    if (!role || !["instructor", "learner"].includes(role)) {
      response.status(400).json({ error: "Role must be 'instructor' or 'learner'" });
      return;
    }

    if (!username || !password) {
      response
        .status(400)
        .json({ error: "Please enter username and password" });
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
    }
  catch (error) {
    response.status(500).json({ error: "Failed to create user" });
  }
};
