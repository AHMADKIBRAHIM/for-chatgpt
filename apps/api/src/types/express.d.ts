import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: Types.ObjectId;
        email: string;
      };
    }
  }
}

export {};
