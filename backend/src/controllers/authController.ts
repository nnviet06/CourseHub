// Contains logic for login and signup

import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import { User } from "../models/users";

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const JWT_SECRET = process.env.JWT_SECRET!;
    
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Please enter username and password" });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
        }

        // Create token
        const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        );
    
        // Set cookie
        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        });
    
        // Return user info without passwordHash
        const { passwordHash: _passwordHash, ...safeUser } = user.toJSON();
        res.json(safeUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
}


export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!role || !["instructor", "learner"].includes(role)) {
      res.status(400).json({ error: "Role must be 'instructor' or 'learner'" });
      return;
    }

    if (!username || !password) {
      res
        .status(400)
        .json({ error: "Please enter username and password" });
      return;
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        res.status(409).json({ error: "Username already taken" });
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
        res.status(201).json(safeUser);
    }
  catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};