import bcrypt from "bcrypt";

export const hashPassword = async (password:string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword
}

export const hashCompare = async (password:string, hashedPassword:string)=> {
  return await bcrypt.compare(password, hashedPassword)
} 
