import bcrypt from 'bcrypt';
import connection from '../Database/connection';

const salt = 10;
const saltKeys = 'KjSkNiBgT';

export const generatePasswordHashed = (password) => {
  const pass = bcrypt.hashSync(`${password}${saltKeys}`, salt);

  return pass;
};

export const verifyPassword = (passwordToCompare, password) => {
  const isValid = bcrypt.compareSync(
    `${passwordToCompare}${saltKeys}`,
    password
  );

  return isValid;
};

export const getCurrentDoctorPassword = async (id) => {
  const doctorPassword = connection('doctors')
    .select('password')
    .where({ id })
    .first();

  return doctorPassword;
};

/*
        FUNÇÃO GERADORA DE SALT
------------------------------------------
import crypto from 'crypto';

export const generateSalt = (length) => {
  const newSalt = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, 16);
  return newSalt;
};
*/
