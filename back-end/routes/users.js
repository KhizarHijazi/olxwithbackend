import express from "express";
import users from '../modules/userSchema.js'


const router = express.Router()

router.post('/signup', async (req, res) => {

    const { fullname, email, password } = req.body
    try {
        const user = await users.create({ fullname, email, password })
        await user.save()
        console.log(user)
        res.status(200).send({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).send({ message: "Failed to register user", error: error.message });
    }
})

router.put('/login', async (req, res) => {
    try {
        // step 1 :  email exists 
        const { email, password } = req.body
        const user = await users.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: 'User not found. Please sign up first.' });

        }
        // step 2 :  password encryption 
        const isCorrectPassword = user.comparePassword(password)
        if(!isCorrectPassword){
            return res.status(401).send({ message: 'Invalid password' });
        }
        // step 3 :  jwt token 
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
        res.send({ message: "user logged in successfully" , token})
    } catch (error) {

        res.status(500).send(error.message)
    }

})
export default router