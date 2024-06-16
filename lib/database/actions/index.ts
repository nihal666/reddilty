"use server";

import dbConnect from "..";
import UserModel from "../models/User.model";

// interfaces/User.ts
export interface User {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export const createUser = async (userData: User) => {
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
