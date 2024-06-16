"use server";

import dbConnect from "..";
import UserModel from "../models/User.model";

export const createUser = async (userData) => {
  try {
    await dbConnect();

    const newUser = new UserModel(userData);
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    
    return null;
  }
};
