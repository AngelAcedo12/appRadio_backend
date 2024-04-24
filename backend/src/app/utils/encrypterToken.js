
import jwt from 'jsonwebtoken';

const tokenEncrypter = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 86400,
    });
    }
export { tokenEncrypter };