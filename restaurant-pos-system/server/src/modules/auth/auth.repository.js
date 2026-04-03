import User from "../users/user.model.js"; export const findUserByEmail=(email)=>User.findOne({email}); export const createUser=(data)=>User.create(data);
