import bcrypt from 'bcrypt'

const hashPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(5);

  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export default hashPassword;