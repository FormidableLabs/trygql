import * as bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 10;

export const toHash = (str: string) => bcrypt.hashSync(str, BCRYPT_ROUNDS);
export const compareToHash = (str: string, hash: string) => bcrypt.compareSync(str, hash);
