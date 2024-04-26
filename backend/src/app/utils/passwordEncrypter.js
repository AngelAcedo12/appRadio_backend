import bcrypt from 'bcryptjs';

async function encryptPassword(password) {
    return await bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
   
    return  bcrypt.compareSync(password, hash)
}
export { encryptPassword, comparePassword };