import bcrypt from "bcrypt";
import { UserModel } from "../models/User";

export async function createUser(input: { name: string; email: string; password: string }) {
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash
  });
  return user;
}

export async function validateUser(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}
