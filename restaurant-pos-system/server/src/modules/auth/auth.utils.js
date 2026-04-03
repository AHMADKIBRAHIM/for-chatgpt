import jwt from "jsonwebtoken"; import { env } from "../../config/env.js"; export const signToken=(u)=>jwt.sign({id:u._id,email:u.email,role:u.role},env.jwtSecret,{expiresIn:env.jwtExpiresIn});
