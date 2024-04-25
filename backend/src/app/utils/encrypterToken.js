

import jwt from 'jsonwebtoken';

const tokenEncrypter = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 86400,
    });
    }

const tokenDecrypter = async(token) => {

    try {
        
     const tokenDecode= await jwt.decode(token, process.env.SECRET);
     console.log(tokenDecode, "tokenDecode")
     return tokenDecode;
    } catch (error) {
        return false;
    }   
}

export { tokenEncrypter, tokenDecrypter};