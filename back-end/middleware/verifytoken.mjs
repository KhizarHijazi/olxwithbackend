import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.js";
import userAuth from "../modules/UserAuth.mjs";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7);

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        console.log('decoded', decoded)

        const tokenExists = await userAuth.findOne({ tokens: { $in: [token] } });

        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        // req.userId = decoded._id
        // req.tokenToRemove = token

        next()
    } catch (e) {
        res.status(401).send({ message: `catch error : ${e.message}` })
    }
}

export default verifyToken